
exports.up = async function(knex) {
    await knex.schema.createTable('mensajes', table => {
        table.increments('id');
        table.string('msg');
        table.string('email');
        table.timestamp('hora', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
  
};
