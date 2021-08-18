
const ProductoService=require('../services/producto');
class ProductoControlador{
	constructor(modelo){
		this.model=modelo;
	}
	async productoController (req,res,next){
		await ProductoService.createProducto(req.body);
		res.status(200).json({
			...req.body,
		})
	}
	async productovController(req,res,next){
		try{
			let productos=await ProductoService.vistaProducto();
			if (productos.length==0){
				throw new Error('no hay productos cargados')
			}
			res.status(200).json(productos);
		}catch(e){
			res.status(404).json ({"error": e.message});
		}
	}
	async productovControllerid(req,res,next){
		try{
			let producto=await ProductoService.vistaProductoid(req.params.id);
			if (producto.length==0){
				throw new Error('no hay productos cargados')
			}
			res.status(200).json(producto);
		}catch(e){
			res.status(404).json ({"error": e.message});
		}
	}
	async productobController(req,res,next){
		try{
			let producto={
				"title":req.body.title,
				"price": req.body.price,
				"thumbnail":req.body.thumbnail,
				"id":req.params.id
			}
			let borrado=await ProductoService.borrarProducto(req.params.id);
			if (borrado!=1){
				throw new Error("error al borrar el producto");
			}
			res.json(producto);
		}catch(e){
			res.json({"error":e.message});
		}
	}
	async productosVista(req,res,next){
		try{
			let contenido= await ProductoService.vistaProducto();
			console.log("contenido")
			if (contenido.length==0){
				throw new Error('no hay productos')
			}
			res.render("vista",{productos: contenido});
		}catch(e){
			res.render ("vista",{error: e.message});
		}
	}
}
module.exports=new ProductoControlador();
