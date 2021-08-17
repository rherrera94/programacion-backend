
const ProductoService=require('../services/producto');
class ProductoControlador{
	constructor(modelo){
		this.model=modelo;
	}
	async productoController (req,res,next){
		//const product=new ProductoService();
		await ProductoService.createProducto(req.body);
		res.status(200).json({
			...req.body,
		})
	}
	async productovController(req,res,next){
		let productos=await ProductoService.vistaProducto();
		res.status(200).json(productos);
	}
	async productovControllerid(req,res,next){
		let producto=await ProductoService.vistaProductoid(req.params.id);
		res.status(200).json(producto);
	}
}
module.exports=new ProductoControlador();
/*
const ProductoService=require('../services/producto');
exports.productoController=async (req,res,next)=>{
	const product=new ProductoService();
	await product.createProducto(req.body);
	res.status(200).json({
		...req.body,
	})
}
exports.productovController=async(req,res,next)=>{
	let productos=await ProductoService.vistaProductos();
	res.status(200).json(productos);
}*/