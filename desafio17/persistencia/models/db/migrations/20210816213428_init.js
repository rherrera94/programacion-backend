exports.up=function(knex){
	return knex.schema.createTable('productos',(table)=>{
		table.increments('id');
		table.string('title').notNullable();
		table.float('price').notNullable();
		table.string('thumbnail').notNullable();
	})
};

exports.down=function(knex){
	return knex.schema.dropTable('productos');
}