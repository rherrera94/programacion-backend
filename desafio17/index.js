const {PORT}=require("./persistencia/config/globals");
const {app,http}=require("./persistencia/server");

/*app.listen(PORT,()=>{
	console.log(`Listening on port:${PORT}`);
})*/
http.listen (PORT,()=>console.log('El servidor esta funcionando'));
