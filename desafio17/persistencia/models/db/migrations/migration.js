const { db, dbsqlite3} = require('../db');//tomo las conexiones
(async () =>{
    try{
        await db.schema.createTable('productos',table =>{
            table.increments('id');
            table.string('title');
            table.float('price');
            table.string('thumbnail');
        })
        await dbsqlite3.schema.createTable('mensajes',table =>{
            table.increments('id');
            table.string('msg');
            table.string('email');
            table.timestamp('hora', { useTz: true }).notNullable().defaultTo(dbsqlite3.fn.now())
        })
    }catch(e){
        console.log("Se ha producido un error en el proceso de migración")
    }
    
    process.exit(0);// esto lo hago para que no se quede colgado el sistema y haya que apretar ctrl+c   
})()