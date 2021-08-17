const {productoController, productovController, productovControllerid}=require("../controller/producto");

module.exports=(router)=>{
	router.post("/api/productos/guardar",productoController);
	router.get("/api/productos/vista",productovController);
	router.get("/api/productos/:id",productovControllerid);
	return router;
};