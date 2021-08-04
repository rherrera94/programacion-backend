class msgChat{
    fs=require('fs');

    constructor(nombreArchivo){
        this.nombreArchivo=nombreArchivo;
    }
    async leer() {
        try {
            const contenido= await this.fs.promises.readFile(this.nombreArchivo,'utf-8');//segun filmina 37
            return JSON.parse(contenido);
        } catch{ 
            return [];
        }
    }
    
    async guardar(mensaje) {
        const contenido = await this.leer();
        contenido.push(mensaje);
        try {    
            // necesito usar stringify para poder pasar el json a string y meterlo en el archivo
            await this.fs.promises.writeFile(this.nombreArchivo,JSON.stringify(contenido)); //segun filmina 39
            return mensaje;
        } catch (e) {
            return [];
        }
    }     
}

module.exports=new msgChat('chat.txt');