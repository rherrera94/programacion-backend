const { db, dbsqlite3} = require('../db');
(async () =>{
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
    process.exit(0);   
})()