class Archivo{
    fs=require('fs');

    constructor(nombreArchivo){
        this.nombreArchivo=nombreArchivo;
    }
    async leer() {
        try {
            const contenido= await this.fs.promises.readFile(this.nombreArchivo,'utf-8');//segun filmina 37
            return JSON.parse(contenido);
        } catch{
            //El enunciado pide que si no existe el archivo se devuelva un array vacio
            //aca va a entrar en 3 casos:  si no lo puede leer al archivo, si no existe o si esta vacio 
            return [];
        }
    }
    async guardar(producto) {
        /* el enunciado pide que el id del producto sea la longitud total del array (osea de lo que hay dentro
        del archivo) + 1 para poder hacer esto primero tengo que leer el archivo antes que hacer cualquier cosa*/
        const contenido = await this.leer();
        producto.id = contenido.length + 1; 
        contenido.push(producto);
        try {
            
            // necesito usar stringify para poder pasar el json a string y meterlo en el archivo
            await this.fs.promises.writeFile(this.nombreArchivo,JSON.stringify(contenido)); //segun filmina 39
        } catch (e) {
            console.error("Se ha producido un error al intentar guardar el contenido del archivo");
        }
    }     
    async borrar() {
        try {
            await this.fs.promises.unlink(this.nombreArchivo);
        } catch (error) {
            console.error("error al intentar borrar archivo");
        }
    }
}

/********************************************************************************/
/* Apartir de aca es la funcion para probar la clase                            */
/********************************************************************************/ 

async function prueba(){
    const archivo = new Archivo("productos.txt");   
    let producto={
		"title": "Escuadra",
		"price": 123.45,
		"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
		"id": 1
	}  
    await archivo.guardar(producto);
    producto={
		"title": "Calculadora",
		"price": 234.56,
		"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
		"id": 2
	};
    await archivo.guardar(producto);
    producto={
		"title": "Globo Terráqueo",
		"price": 345.67,
		"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
		"id": 3
	};
    await archivo.guardar(producto);
    console.log(await archivo.leer());
   // await archivo.borrar();
  
}

prueba();// llamo a la funcion 