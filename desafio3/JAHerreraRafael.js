
const tiempoEspera = (time) => {
    for(let i=0; i< time * 3e6; i++);
}

function palabras (frase,tiempo,cantpalabras, funcion){
    let fraseSeparada= frase.split(" ");
    let palabrasCant=fraseSeparada.length;
    for (let j=0; j<fraseSeparada.length;j++){
        tiempoEspera(tiempo?tiempo:600);
        console.log(fraseSeparada[j]);
    }
    let i=cantpalabras+palabrasCant;
    funcion(i);
    
}

palabras("rafael, herrera es alumno del curso de programacion backend", 1000, 0, (cantidadPalabras) => {
    palabras("rafael herrera 36 años",  null, cantidadPalabras, (cantidadPalabras) => {
        palabras("texto3 este es el texto", 300, cantidadPalabras, (cantidadPalabras) => {
            console.log("Proceso completo el total de palabras es:", cantidadPalabras);
        });
    });
});
