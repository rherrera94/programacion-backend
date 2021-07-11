
// link al repositorio de github https://github.com/rherrera94/desafio8
const express= require('express');
const app= express();
const listado=require('./Archivo');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
 almacena el producto y devuelve el producto incorporado
*/
app.post('/api/productos/guardar',async (req,res)=>{
   
    try{
        if (!req.body.title || !req.body.price || !req.body.thumbnail){
            throw new Error ("debe rellenar todos los datos solicitados")
        }
        await listado.guardar({"title":req.body.title,"price":req.body.price,"thumbnail":req.body.thumbnail})
        res.json({"title":req.body.title,"price":req.body.price,"thumbnail":req.body.thumbnail});
    }catch(e){
        res.json({"error":e.message});
    }
})
/*
 Devuelve un array de productos
*/
app.get('/api/productos/listar',async (req,res)=>{
   
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
app.get('/api/productos/listar/:id',async (req,res)=>{
    
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
app.listen (8080,()=>console.log('El servidor esta funcionando'));







