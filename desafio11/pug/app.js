
//para entrar a la aplicacion http://localhost:8080
const express= require('express');
const app= express();
const listado=require('./Archivo');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.get('/',(req,res)=>{
    res.render("formulario.pug");
})
app.get("/productos/vista", async (req, res) => {
    try{
        let contenido= await listado.leer();
        if (contenido.length==0){
            throw new Error('no hay productos')
        }
        res.render("vista.pug",{productos: contenido});
    }catch(e){
        res.render ("vista.pug",{error: e.message});
    }
});

/*
 almacena el producto y devuelve el producto incorporado
*/
app.post('/productos/guardar',async (req,res)=>{
   
    try{
        if (!req.body.title || !req.body.price || !req.body.thumbnail){
            throw new Error ("debe rellenar todos los datos solicitados")
        }
        let resultado=await listado.guardar({"title":req.body.title,"price":req.body.price,"thumbnail":req.body.thumbnail})
        if (resultado.length==0){
            throw new Error("Error al guardar el archivo");
        }
        res.render("formulario.pug");
    }catch(e){
        res.json({"error":e.message});
    }
})
/*
    Permite modificar un producto
*/
app.put('/productos/:id',async(req,res)=>{
    try{
        //me fijo si el producto existe
        let producto=await listado.buscar(req.params.id);
        if (producto.length==0){
            throw new Error("El producto buscado no existe");
        }
        let productoaModificar={
            "title":req.body.title,
            "price": req.body.price,
            "thumbnail":req.body.thumbnail,
            "id":req.params.id
        }
        let productoModificado=await listado.modificar(productoaModificar);
        if (productoModificado.length==0){
            throw new Error("Se ha producido un error al modificar el producto");
        }else{
            res.json(productoModificado);
        }

    }catch(e){
        res.send({"Mensaje": e.message});
    }    
})
/*
 Devuelve un array de productos
*/
app.get('/productos/listar',async (req,res)=>{
   
    try{
        let contenido= await listado.leer();
        if (contenido.length==0){
            throw new Error('no hay productos cargados')
        }
        res.json (contenido);
    }catch(e){
        res.json ({"error": e.message});
    }
})
/*
Devuelve un producto del listado
*/
app.get('/productos/listar/:id',async (req,res)=>{
    
    try{
        let contenido=await listado.buscar(req.params.id);
        if (contenido.length==0){
            throw new Error ('producto no encontrado');
        }
        res.json(contenido);
    }catch(e){
        res.json({"error":e.message});
    }
})
/*
    Permite eliminar un producto
*/
app.delete('/productos/borrar/:id',async (req,res)=>{
    try{
        let producto={
            "title":req.body.title,
            "price": req.body.price,
            "thumbnail":req.body.thumbnail,
            "id":req.params.id
        }
        let borrado=await listado.borrarProducto(producto);
        if (borrado.length==0){
            throw new Error("Error al borrar el producto")
        }
        res.json(borrado);
    }catch(e){
        res.json({"error":e.message});
    }
    
})
app.listen (8080,()=>console.log('El servidor esta funcionando'));







