const superheroes = [
    {
        nombre: 'Iron Man',
        poder: 92,
        ataques: ['Rayos repulsores', 'Vuelo', 'Armadura avanzada']
    },
    {
        nombre: 'Thor',
        poder: 95,
        ataques: ['Mjolnir', 'Control sobre el clima', 'Fuerza sobrehumana']
    },
    {
        nombre: 'Hulk',
        poder: 90,
        ataques: ['Fuerza descomunal', 'Regeneración', 'Resistencia']
    },
    {
        nombre: 'SpiderMan',
        poder: 85,
        ataques: ['Telarañas', 'Sentido arácnido', 'Agilidad sobrehumana']
    },
    {
        nombre: 'Capitan America',
        poder: 88,
        ataques: ['Escudo indestructible', 'Habilidades de combate', 'Resistencia mejorada']
    },
    {
        nombre: 'BlackWidow',
        poder: 82,
        ataques: ['Habilidades de espionaje', 'Artes marciales', 'Táctica avanzada']
    },
    {
        nombre: 'Doctor Strange',
        poder: 93,
        ataques: ['Hechicería', 'Manipulación del tiempo', 'Proyección astral']
    },
    {
        nombre: 'BlackPanther',
        poder: 87,
        ataques: ['Habilidades de lucha', 'Agilidad', 'Sentido agudo']
    },
    {
        nombre: 'Wolverine',
        poder: 89,
        ataques: ['Garras retráctiles', 'Factor curativo', 'Sentidos agudizados']
    },
    {
        nombre: 'Vision',
        poder: 94,
        ataques: ['Fuerza sobrehumana', 'Disparo de energía', 'Inteligencia artificial avanzada']
    },
    {
        nombre: 'AntMan',
        poder: 83,
        ataques: ['Manipulación del tamaño', 'Comunicación con hormigas', 'Sigilo']
    },
    {
        nombre: 'Gamora',
        poder: 86,
        ataques: ['Habilidades de lucha', 'Maestría con armas', 'Resistencia aumentada']
    },
    {
        nombre: 'StarLord',
        poder: 84,
        ataques: ['Habilidades tácticas', 'Manejo de armas', 'Tecnología avanzada']
    }
];

const rayo = {
    nombre: 'McQueen',
    poder: 100,
    ataques: ['Cuchau', 'FIIIÑAAAUUUUUN', 'BRRRMMM BRRMMM']
}

const superheroesListaHTML = document.getElementById('listaSuperheroes');

let victoriasTotalesHTML = document.getElementById(`victoriasTotales`);
victoriasTotalesHTML.textContent = `Has ganado: ${getVictoriasTotales()} veces`

for(const heroe of superheroes) {
    const {nombre,ataques} = heroe;
    let lista = document.createElement('li');
    lista.innerHTML = 
    `
    <button> 
        <h2> ${nombre} </h2>
        <h3> PODERES </h3>
        <p class="ataques"> ${ataques[0]} ~ ${ataques[1]} ~  ${ataques[2]} </p>
        <p class="victorias" id="victorias-${nombre}">Victorias: ${getVictoriasPorHeroe(nombre)}</p>
    </button>
    `
    lista.addEventListener("click", function(){
        PELEA(heroe)
        const victoriasElement = document.getElementById(`victorias-${nombre}`);
        victoriasElement.textContent = `Victorias: ${getVictoriasPorHeroe(nombre)}`;
        victoriasTotalesHTML.textContent = `Has ganado: ${getVictoriasTotales()} veces`
    });
    superheroesListaHTML.appendChild(lista);
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
    let heroes = {};
    heroe1.poder > heroe2.poder ? (heroes.ganador = heroe1, heroes.perdedor = heroe2, heroes.usuario = true) : (heroes.ganador = heroe2, heroes.perdedor = heroe1, heroes.usuario = false);
    return heroes;
}

function PELEA(heroeUsuario) {
    const heroeConsola = randomHeroe(heroeUsuario);
    const batalla = compararPoderes(heroeUsuario, heroeConsola);
    const GANADOR = batalla.ganador;
    const PERDEDOR = batalla.perdedor;
    console.log(`${GANADOR.nombre} le ganará a ${PERDEDOR.nombre} ? ${batalla.usuario}`);

    batalla.usuario ? (nuevaVictoria(heroeUsuario), 
        alert(`Excelente! ${GANADOR.nombre} destrozó a ${PERDEDOR.nombre} y ha ganado el duelo gracias a su ${ataqueRandom(GANADOR)}`)) :
        alert(`OH no! ${GANADOR.nombre} destrozó a ${PERDEDOR.nombre} y ha ganado el duelo gracias a su ${ataqueRandom(GANADOR)}`);
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