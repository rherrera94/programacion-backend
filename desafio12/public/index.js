
const socket=io();
socket.on('productos',productos =>{
    vistaTabla(productos, html => {
        document.getElementById('tablita').innerHTML = html;
    })
})

const form = document.querySelector('form');
form.addEventListener('submit', evento => {
    evento.preventDefault();
    //la parte del getElementsByName me guie por lo que dice 
    //https://developer.mozilla.org/es/docs/Web/API/Document/getElementsByName
    //en este caso lo que voy a hacer es tomar el valor que trae el titulo, el precio y el thumbnail
    //para poder guardarlos
    const productoInfo = {
        title: document.getElementsByName('title')[0].value,
        price: document.getElementsByName('price')[0].value,
        thumbnail: document.getElementsByName('thumbnail')[0].value
    }
    /*
    llamo la ruta /productos/guardar de mi api y le paso la informacion
    sacada del formulario.
    */
    fetch('/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(productoInfo)
    }) 
    .then(respuesta =>respuesta.json()) 
    .then( productos => {
        form.reset() 
        socket.emit('guardarProducto', 'ok');
    })
    .catch(error => console.error(error.message));
})

function vistaTabla(productos,cb) {
    fetch('/tablaProductos.hbs')
    .then(respuesta => respuesta.text())
    .then( plantilla => {
        var template = Handlebars.compile(plantilla);
        let html = template(productos);
        cb(html);
    })
}