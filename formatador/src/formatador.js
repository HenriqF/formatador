//variaveis.
let modos = ['inverter','binário','texto pequeno','morse','ponta cabeça','demoniado','chave entre letras','contador'];
var modo = 0;
const input = document.getElementById('input');
const keyinput = document.getElementById('keyinput');
const botaoModos = document.getElementById('botao');
botaoModos.addEventListener('click', trocarmodo);

//faz o botão de copiar funcionar.
document.getElementById("copiar").addEventListener("click", function() {
    const textarea = document.getElementById("input");
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value);
});

//faz com que o texto seja salvo e que a tecla enter (despareada do shift) realize a transformacao.
[input, keyinput].forEach(x => {
    x.addEventListener('keydown', function(event){
        if (event.key === "Enter" && !event.shiftKey){
            aplicarmodo();
            event.preventDefault();
        }
        
    });
    x.addEventListener('keyup', function(event){
        chrome.runtime.sendMessage({ type: 'save', key: 'myData', value: input.value });
    });
});

//aplica o modo ao texto.
function aplicarmodo(){
    if (input.value.length >= 50000){
        console.log("erro! -> texto muito grande.");
        return;
    }
    switch (modos[modo]){
        case 'inverter':
            input.value = input.value.split('').reverse().join('');
            break;

        case 'binário':
            input.value = input.value.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
            break;

        // os tres casos seguintes carregam um mapa ( hash / dict ) de /mapas para poder fazer a troca de letras.
        case 'texto pequeno':
            fetch(chrome.runtime.getURL('src/mapas/pequeno.json'))
                .then(res => res.json())
                .then(mapa => {
                    input.value = input.value.split('').map(char => mapa[char] !== undefined ? mapa[char] : char).join('');
                });
            break;

        case 'morse':
            fetch(chrome.runtime.getURL('src/mapas/morse.json'))
                .then(res => res.json())
                .then(mapa => {
                    input.value = input.value.split('').map(char => mapa[char] !== undefined ? mapa[char] : char).join(' ');
                })
            break;

        case 'ponta cabeça':
            fetch(chrome.runtime.getURL('src/mapas/pontacabeca.json'))
                .then(res => res.json())
                .then(mapa=> {
                    input.value = input.value.split('').map(char => mapa[char] !== undefined ? mapa[char] : char).join(' ');
                })
            break;

        //os dois casos seguintes usam o campo "keyinput" pra poder modificar o texto.
        case 'demoniado':
            const cima = ['\u0300','\u0301','\u0302','\u0303','\u0304','\u0305','\u0306','\u0307','\u0308'];
            const baixo = ['\u0316','\u0317','\u0318','\u0319','\u031A','\u031B'];
            input.value = input.value.split('').map(char => {
            let mod = char;
            for (let i = 0; i < parseInt(keyinput.value, 10); i++) { 
                mod += cima[Math.floor(Math.random()*cima.length)];
                mod += baixo[Math.floor(Math.random()*baixo.length)];
            }
                return mod;
            }).join('');
            break;
        
        case 'chave entre letras':
            input.value = input.value.split('').join(keyinput.value)
            break;

        case 'contador':
            let process = input.value;
            let linhas = 1
            let letras = 0
            let numeros = 0
            let outros = 0
            let espacos = 0
            for (let i =0; i< process.length; i++){
                const ch = process[i];
                if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")) letras++;
                else if ((ch >= "0" && ch <= "9")) numeros++;
                else if (ch == " ") espacos++;
                else if (ch == "\n") linhas++;
                else outros++;
            }
            input.value = `letras: ${letras}\ndígitos: ${numeros}\nespaços: ${espacos}\noutros: ${outros}\nlinhas: ${linhas}`
            break;
    }
}

//troca de modo. tambem edita o campo placeholder de keyinput ( variavel modo ).
function trocarmodo(){
    modo++;
    if (modo > modos.length-1){
        modo = 0;
    }
    botaoModos.textContent = "modo: " + modos[modo];
    switch (modos[modo]){
        case 'demoniado':
            keyinput.placeholder = "intensidade aqui (número).";
            break;
        case 'chave entre letras':
            keyinput.placeholder = "o que vai entre as letras aqui.";
            break;
        default:
            keyinput.placeholder = "chave aqui.";
            break;
    }
}

//carrega o texto salvo quando executado.
chrome.runtime.sendMessage({ type: 'load', key: 'myData' }, (response) => {
    if (response && response.value !== undefined) {
        input.value = response.value;
    } 
    else {
        input.value = '';
    }
});