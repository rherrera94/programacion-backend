const {PORT}=require("./persistencia/config/globals");
const {app,http}=require("./persistencia/server");

http.listen (PORT,()=>console.log(`El servidor esta funcionando ${PORT}`));
