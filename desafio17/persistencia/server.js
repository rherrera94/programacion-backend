const express=require('express');
const routes=require ('./routes/routes');
const cors=require ('cors');
const compression=require ('compression');
const router=express.Router();
const app=express();
const http = require('http').Server(app)
const io = require('socket.io')(http)
const productoio=require('./services/producto');
const mensajeio=require('./services/mensaje');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/../public'))
const handlebars=require('express-handlebars');

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());
app.use(cors());
app.use(compression());

app.use(routes(router));
io.on('connect', async (socket)=>{
    let contenido=async ()=>{
        try{
            let cont= await productoio.vistaProducto();
            if (cont.length==0){
                throw new Error('no hay productos')
            }
            return({productos: cont});
        }catch(e){
            return({error: e.message});
        }
    }
    socket.emit('productos',await contenido());
    socket.on('guardarProducto', async (data) =>{
        io.sockets.emit('productos',await contenido());
      }
    )
})
module.exports={
    app,
    io,
    http}