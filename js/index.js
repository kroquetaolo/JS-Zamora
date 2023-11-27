let superheroes = [
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

function randomHeroe(){
    
    const randomNumber = Math.floor(Math.random() * superheroes.length);
    return superheroes[randomNumber];
}

function ataqueRandom(heroe) {
    const index = Math.floor(Math.random() * heroe.ataques.length);
    return heroe.ataques[index];
}

function heroePorNombre(nombre) {
    const nombreBuscado = nombre.toLowerCase();
    for (let i = 0; i < superheroes.length; i++) {
        const nombreSuperheroe = superheroes[i].nombre.toLowerCase();
        if (nombreSuperheroe === nombreBuscado) {
        return superheroes[i];
        }
    }
    return null;
}

function compararPoderes(heroe1, heroe2) {
    let heroes = {};
    if(heroe1.poder > heroe2.poder) {
        heroes.ganador = heroe1;
        heroes.perdedor = heroe2;
    } else {
        heroes.ganador = heroe2;
        heroes.perdedor = heroe1;
    }
    return heroes;
}

const nombres = superheroes.reduce((acumulador, superheroe, index) => {
    if (index === 0) {
        return superheroe.nombre;
    } else {
        return acumulador + ', ' + superheroe.nombre;
    }
}, '');

let elegirHeroe = prompt(`Elige tu campeón: " ${nombres}`);
let heroeUsuario = heroePorNombre(elegirHeroe);
let heroeConsola = randomHeroe()

while(!heroeUsuario && elegirHeroe !== null) {
    elegirHeroe = prompt(`Debe ser un heroe de estos: ${nombres}`);
    heroeUsuario = heroePorNombre(elegirHeroe); 
}

let GANADOR = compararPoderes(heroeUsuario, heroeConsola).ganador;
let PERDEDOR = compararPoderes(heroeUsuario, heroeConsola).perdedor;
alert(`${heroeUsuario.nombre} se va a enfrentar a ${heroeConsola.nombre}`)

alert(`${PERDEDOR.nombre} ataca con su "${ataqueRandom(PERDEDOR)}" pero ${GANADOR.nombre} lo evita usando su "${ataqueRandom(GANADOR)}"`)

alert(`OH no! ${GANADOR.nombre} destrozó a ${PERDEDOR.nombre} y ha ganado el duelo gracias a su "${ataqueRandom(GANADOR)}"`)