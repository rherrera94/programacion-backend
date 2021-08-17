const ProductoDAO=require('../models/dao/producto')
class productoService{
	constructor(){}
	async createProducto(producto){
		return ProductoDAO.createProducto(producto);
	}
	async vistaProducto(){
		return ProductoDAO.vistaProductos();
	}
	async vistaProductoid(id){
		return ProductoDAO.vistaProductosid(id);
	}
}
module.exports=new productoService();