
alert("te propongo que adivines que numero estoy pensando!");

adivinanza(4, "es un numero par. ¿Cuál podrá ser?")

function adivinanza(numeroCorrecto, mensanje) {
    const correcto = numeroCorrecto;
    var adivino;
    do {
        let numeroEntregado = parseInt(prompt(mensanje));
        if(!isNaN(numeroEntregado)) {
            const numeroEntregadoInt = parseInt(numeroEntregado);
            if (numeroEntregadoInt !== numeroCorrecto) {
                if (numeroEntregadoInt < numeroCorrecto) {
                    alert("numero incorrecto! el numero es mayor que " + numeroEntregado);
                } else {
                    alert("numero incorrecto! el numero es menor que " + numeroEntregado);
                }
                adivino =false;
            } else {
                alert("Correcto! adivinaste,el numero correcto era " + numeroCorrecto);
                adivino =true;
            }
        } else {
            alert("debes ingresar un numero!");
        }
    } while (!adivino);
}