const productModel=require("../producto");

class productoDAO{
	async createProducto({title,price,thumbnail}){
		await productModel.create({title,price,thumbnail});
	}
	async vistaProductos(){
		return productModel.find();
	}
	async vistaProductosid(id){
		return productModel.findById(id);
	}
	async borrarProducto(id){
		await productModel.deleteOne({ _id: id})
	}
};
module.exports=new productoDAO();