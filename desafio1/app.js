class Usuario{

    constructor (nombre, apellido, libros, mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    };
    addMascota(mascota){
        this.mascotas.push(mascota);
    };
    getMascotas(){
        return this.mascotas.length;
    }
    addBook(book, autor){
        this.libros.push({nombre:book,autor:autor});
    }
    getBooks(){
        let arrayLibro=[];
        for (let i=0;i<this.libros.length;i++){
            arrayLibro.push(this.libros[i].autor);
        }
        return arrayLibro;
    }
}

let rafael= new Usuario ('rafael','herrera',[{nombre:'Algoritmia, arquitectura de datos y programacion estructurada',autor:'gustavo lopez'}],['tomi','pancho','bamba']);
console.log(rafael);
console.log (rafael.getFullName());
rafael.addMascota("juancito");
console.log(rafael.getMascotas());
rafael.addBook("batman","autora x");
console.log(rafael.getBooks());