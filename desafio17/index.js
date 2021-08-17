const {PORT}=require("./persistencia/config/globals");
const app=require("./persistencia/server");

app.listen(PORT,()=>{
	console.log(`Listening on port:${PORT}`);
})