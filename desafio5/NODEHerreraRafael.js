
// esta en https://desafio5-rafael-herrera.glitch.me/
const http=require('http');

const server=http.createServer((peticion,respuesta)=>{
    respuesta.end (JSON.stringify({
        id:Math.floor(Math.random()*(10-1+1))+1,
        title: "producto"+ (Math.floor(Math.random()*(10-1+1))+1),
        price:((Math.random()*(9999.99-0.00+1))+1).toFixed(2),
        thumbnail: "Foto"+ (Math.floor(Math.random()*(10-1+1))+1)}));
})

server.listen(3000,function(){ console.log("servidor en puerto"+3000)})