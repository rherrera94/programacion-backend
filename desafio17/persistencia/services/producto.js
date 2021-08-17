const ProductoDAO=require('../models/dao/producto')
class productoService{
	constructor(){}
	async createProducto(producto){
		const productoDao=new ProductoDAO();
		return productoDao.createProducto(producto);
	}
	async vistaProducto(){
		const productoDao=new ProductoDAO();
		return productoDao.vistaProductos();
	}
	async vistaProductoid(id){
		const productoDao=new ProductoDAO();
		return productoDao.vistaProductosid(id);
	}
}
module.exports=new productoService();