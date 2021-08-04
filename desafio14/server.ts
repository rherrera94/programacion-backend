//para entrar a la aplicacion http://localhost:8080
const express= require('express');
const app= express();
const routerApi=express.Router();
const listado=require('./Archivo');
const chatMensajes=require('./msgChat');
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))

const handlebars=require('express-handlebars');

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.use('/',routerApi);
app.set("view engine", "hbs");
app.set("views", "./views");

routerApi.get('/',(req,res)=>{
    res.render("vistaTabla");
})
routerApi.get("/productos/vista", async (req, res) => {
    try{
        let contenido= await listado.leer();
        if (contenido.length==0){
            throw new Error('no hay productos')
        }
        res.render("vista",{productos: contenido});
    }catch(e){
        res.render ("vista",{error: e.message});
    }
});

/*
 almacena el producto y devuelve el producto incorporado
*/
routerApi.post('/productos/guardar',async (req,res)=>{
   
    try{
        if (!req.body.title || !req.body.price || !req.body.thumbnail){
            throw new Error ("debe rellenar todos los datos solicitados")
        }
        let resultado=await listado.guardar({"title":req.body.title,"price":req.body.price,"thumbnail":req.body.thumbnail})
        if (resultado.length==0){
            throw new Error("Error al guardar el archivo");
        }
        res.json(resultado);
    }catch(e){
        res.json({"error":e.message});
    }
})
/*
    Permite modificar un producto
*/
routerApi.put('/productos/:id',async(req,res)=>{
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
routerApi.get('/productos/listar',async (req,res)=>{
   
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
routerApi.get('/productos/listar/:id',async (req,res)=>{
    
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
routerApi.delete('/productos/borrar/:id',async (req,res)=>{
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
http.listen (8080,()=>console.log('El servidor esta funcionando'));
io.on('connect', async (socket)=>{
    let contenido=async ()=>{
        try{
            let cont= await listado.leer();
            if (cont.length==0){
                throw new Error('no hay productos')
            }
            return({productos: cont});
        }catch(e){
            return({error: e.message});
        }
    }
    let contenidochat=async ()=>{
        try{
            let cont= await chatMensajes.leer();
            return({mensajes: cont});
        }catch(e){
            return({error: e.message});
        }
    }
    let mensajeGuarda=async(msg: Object)=>{
        try{    
            let resultado=await chatMensajes.guardar(msg)
            if (resultado.length==0){
                throw new Error("Error al guardar el archivo");
            }
            return({mensajes:resultado});
        }catch(e){
            return({"error":e.message});
        }        
    }
    socket.on('chat:mensaje',async(data: Object)=>{ 
        await mensajeGuarda(data);
        io.sockets.emit('chat',await contenidochat());
    })
    socket.emit('productos',await contenido());
    socket.emit('chat',await contenidochat());
    socket.on('guardarProducto', async (data: Object) =>{
        io.sockets.emit('productos',await contenido());
      }
    )
})