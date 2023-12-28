
let allowClick = true;

let superheroes = []

const rayo = {
    nombre: 'McQueen',
    poder: 100,
    ataques: ['Cuchau', 'FIIIÑAAAUUUUUN', 'BRRRMMM BRRMMM', 'super sensualidad']
}

const superheroesListaHTML = document.getElementById('listaSuperheroes');

let victoriasTotalesHTML = document.getElementById(`victoriasTotales`);
victoriasTotalesHTML.textContent = `Has ganado: ${getVictoriasTotales()} veces`;

const urlApi = `https://raw.githubusercontent.com/kroquetaolo/trampita/main/heroesMarvel.json`; 
//profe perdón la trampa pero la API de marvel tenia muchas cosas y así es mas facil x'D solo quería las imagenes
//ademas que tiene limite de 3000 solicitudes :c igual fue divertido jugar con la API de marvel (mucho texto)

fetch(urlApi)
    .then((response) => response.json())
    .then((responseData) =>{
        try {
            cargarDatos(responseData);
            cargarHTML();
        } catch (error) {
            console.error('Error durante la carga de datos o HTML:', error);
        }
    })
    .catch(error => console.log(`Error de datos`, error))
    .finally(()=> console.log(`proceso finalizado de ${urlApi}`));

function cargarDatos(datos) {
    datos.forEach(element => {
        let heroe = {
            nombre: element.nombre,
            poder: element.poder,
            ataques: element.ataques,
            imagenUrl: element.imagenUrl
        }
        superheroes.push(heroe)
    });
}

function cargarHTML() {
    for(const heroe of superheroes) {
        const {nombre, poder, ataques, imagenUrl} = heroe;
        const lista = document.createElement('li');
        const fuerza = poder >= 88 ? 'fuerte' : 'débil';

        lista.innerHTML = 
        `
        <button>
            <h2> ${nombre} </h2>
            <img src="${imagenUrl}" alt="">
            <h3> PODERES </h3>
            <p class="ataques"> ${ataques.join(' ~ ')} </p>
            <p class="victorias" id="victorias-${nombre}">Victorias: ${getVictoriasPorHeroe(nombre)}</p>
        </button>
        `;
    
        lista.addEventListener("click", function(){
            if(allowClick) {
                allowClick = false;
                PELEA(heroe)
                .then((resultado) => {
                    Swal.fire({
                        title: resultado.mensaje,
                        imageUrl: resultado.imagen,
                        imageHeight: 250,
                        text: resultado.descripcion,
                        icon: resultado.icono,
                        confirmButtonText: '¡Entendido!',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                    });
                    const victoriasElement = document.getElementById(`victorias-${nombre}`);
                    victoriasElement.textContent = `Victorias: ${getVictoriasPorHeroe(nombre)}`;
                    victoriasTotalesHTML.textContent = `Has ganado: ${getVictoriasTotales()} veces`
                }).catch((error) => {
                    Swal.fire({
                        title: error.mensaje,
                        imageUrl: error.imagen,
                        imageHeight: 250,
                        text: error.descripcion,
                        icon: error.icono,
                        confirmButtonText: '¡Entendido!',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                    });
                });
            } else {
                const enCurso = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    color: "#FF0000",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                enCurso.fire({
                    icon: "warning",
                    title: "Ya hay un enfrentamiento en curso!"
                });
            }
        });
    
        superheroesListaHTML.appendChild(lista)
    }
}

function randomHeroe(heroe){
    let superheroesCopia = [...superheroes];
    superheroesCopia.splice(superheroes.indexOf(heroe), 1)
    const randomNumber = Math.floor(Math.random() * superheroesCopia.length);
    return superheroesCopia[randomNumber];
}

function ataqueRandom(heroe) {
    const index = Math.floor(Math.random() * heroe.ataques.length);
    return heroe.ataques[index];
}

function compararPoderes(heroe1, heroe2) {
    const [ganador, perdedor] = heroe1.poder > heroe2.poder ? [heroe1, heroe2] : [heroe2, heroe1];
    const usuarioGana = heroe1.poder > heroe2.poder;

    return { ganador, perdedor, usuario: usuarioGana };
}

function PELEA(heroeUsuario) {
    const enfrentamientoPromise = new Promise((resolve, reject) => {
    const heroeConsola = randomHeroe(heroeUsuario);
    const cambiaraRayo = Math.random() < 0.1;
    const heroeDelJugador = cambiaraRayo ? rayo : heroeUsuario;
    timeout = 6000;

    const batalla = compararPoderes(heroeDelJugador, heroeConsola);
    const GANADOR = batalla.ganador;
    const PERDEDOR = batalla.perdedor;
    console.log(`${GANADOR.nombre} le ganará a ${PERDEDOR.nombre} ? ${batalla.usuario}`);

    if(heroeDelJugador == rayo){
        Swal.fire({
            imageUrl: `./assets/rayo.gif`,
            title: "¡Algo increíble pasó!",
            backdrop: `
                    rgb(255, 0, 72,0.2) 
                    url("https://i.gifer.com/WS2k.gif")
                    top no-repeat
            `,
            background: "#ffeb34",
            timer: timeout,
            timerProgressBar: true,
            text: `${rayo.nombre} se unió a la pelea y te va a proteger de tu oponente!`,
            showConfirmButton: false, 
            allowEscapeKey: false,
            allowOutsideClick: false,
        });
    } else {
        mostrarEnfrentamientoMensaje();
    }
    setTimeout(() => {
            ocultarEnfrentamientoMensaje();
            allowClick = true;
            if (batalla.usuario) {
                nuevaVictoria(heroeUsuario);
                resolve({
                    heroe: heroeDelJugador,
                    imagen: heroeUsuario.imagenUrl,
                    mensaje: "VICTORIA!",
                    descripcion: `${GANADOR.nombre} destrozó a ${PERDEDOR.nombre} y ha ganado el duelo gracias a su ${ataqueRandom(GANADOR)}`,
                    icono: "success",
                });
            } else {
                reject({
                    heroe: heroeConsola,
                    imagen: GANADOR.imagenUrl,
                    mensaje: "DERROTA!",
                    descripcion: `${GANADOR.nombre} destrozó a ${PERDEDOR.nombre} y ha ganado el duelo gracias a su ${ataqueRandom(GANADOR)}`,
                    icono: "error",
                });
            }
        }, timeout);
    });
    
    return enfrentamientoPromise;
}

function nuevaVictoria(heroeUsuario) {
    let victoriasTotales = localStorage.getItem('victoriasTotales') ? JSON.parse(localStorage.getItem('victoriasTotales')) : {};
    let victoriasPorHeroe = localStorage.getItem('victoriasPorHeroe') ? JSON.parse(localStorage.getItem('victoriasPorHeroe')) : {};

    victoriasTotales.total = victoriasTotales.total ? victoriasTotales.total + 1 : 1;

    if (victoriasPorHeroe[heroeUsuario.nombre]) {
        victoriasPorHeroe[heroeUsuario.nombre]++;
    } else {
        victoriasPorHeroe[heroeUsuario.nombre] = 1;
    }

    localStorage.setItem('victoriasTotales', JSON.stringify(victoriasTotales));
    localStorage.setItem('victoriasPorHeroe', JSON.stringify(victoriasPorHeroe));
    
}

function getVictoriasPorHeroe(nombreHeroe) {
    let victoriasPorHeroe = localStorage.getItem('victoriasPorHeroe') ? JSON.parse(localStorage.getItem('victoriasPorHeroe')) : {};
    return victoriasPorHeroe[nombreHeroe] || 0;
}

function getVictoriasTotales() {
    let victoriasTotales = localStorage.getItem('victoriasTotales') ? JSON.parse(localStorage.getItem('victoriasTotales')) : {};
    return victoriasTotales.total || 0;
}
function mostrarEnfrentamientoMensaje() {
    const mensajeElement = document.getElementById('enfrentamientoMensaje');
    mensajeElement.style.display = 'block';
}

function ocultarEnfrentamientoMensaje() {
    const mensajeElement = document.getElementById('enfrentamientoMensaje');
    mensajeElement.style.display = 'none';
}