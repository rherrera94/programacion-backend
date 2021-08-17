const db=require("../db/db");

module.exports=class productoDAO{
	async createProducto({title,price,thumbnail}){
		await db("productos").insert({
			title,
			price,
			thumbnail,
		})
	}
	async vistaProductos(){
		return db("productos").select();
	}
	async vistaProductosid(id){
		return db("productos").select().where('id',id);
	}
};