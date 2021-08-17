const {productoController, productovController, productovControllerid, productobController, productosVista}=require("../controller/producto");

module.exports=(router)=>{
	router.get('/',(req,res)=>{
		res.render("vistaTabla");
	})
	router.post("/productos/guardar",productoController);
	router.get("/productos/listar",productovController);
	router.get("/productos/listar/:id",productovControllerid);
	router.delete("/productos/borrar/:id",productobController);
	router.get("/productos/vista",productosVista)
	return router;
};