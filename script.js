let intentos = 6;
let palabra;

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

window.addEventListener('load', init);

function init() {
    obtenerPalabraAleatoria();
    
    const guessInput = document.getElementById("guess-input");
    guessInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            intentar();
        }
    });
}

function obtenerPalabraAleatoria() {
    fetch('https://random-word-api.herokuapp.com/word?length=5&lang=en')
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            console.log(palabra)
        })
        .catch(error => {
            console.error('Error al obtener la palabra aleatoria:', error);
        });
}

function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO === palabra) {
        terminar("<h1>¡GANASTE!😀</h1>");
        return;
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851'; 
        } else if (palabra.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237'; 
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    intentos--;
    if (intentos === 0) {
        terminar("<h1>¡PERDISTE!😖</h1>");
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
