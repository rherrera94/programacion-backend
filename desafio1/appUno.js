

   function Usuario (nombre, apellido, libros, mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
        
        this.getFullName= function (){
            return `${this.nombre} ${this.apellido}`;
        };
        this.addMascota= function (mascota){
            this.mascotas.push(mascota);
        };
        this.getMascotas=function (){
            return this.mascotas.length;
        }
        this.addBook= function (book, autor){
            this.libros.push({nombre:book,autor:autor});
        }
        this.getBooks=function (){
            let arrayLibro=[];
            for (let i=0;i<this.libros.length;i++){
                arrayLibro.push(this.libros[i].autor);
            }
            return arrayLibro;
        }
    }
    


let rafael= new Usuario ('rafael','herrera',[{nombre:'Algoritmia, arquitectura de datos y programacion estructurada',autor:'gustavo lopez'}],['tomi','pancho','bamba']);
console.log (rafael.getFullName());
rafael.addMascota("juancito");
console.log(rafael.getMascotas());
rafael.addBook("batman","autora x");
console.log(rafael.getBooks());