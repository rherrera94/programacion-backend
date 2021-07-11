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
            return [];
        }
    }
    async buscar (id){
        const contenido=await this.leer();
        if (contenido==[]){
            return [];
        }
        let i=0;
        let encontrado=0;
        while (i<contenido.length && encontrado==0){
            if (contenido[i].id==id){
                encontrado=1;
            }else{
                i++;
            }
        }
        if (encontrado==1){
            return contenido[i];
        }else{
            return [];
        }
    }
    async guardar(producto) {
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

module.exports=new Archivo('productos.txt');
