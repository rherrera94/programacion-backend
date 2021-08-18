const {db}=require("../db/db");

class productoDAO{
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
	async borrarProducto(id){
		return db("productos").delete().where('id',id);
	}
};
module.exports=new productoDAO();