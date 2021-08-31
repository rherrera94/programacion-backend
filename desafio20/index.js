const {PORT}=require("./persistencia/config/globals");
const {http}=require("./persistencia/server");
const{getConnection}=require('./persistencia/models/db/connection')

getConnection().then((message)=>{
    console.log(message)
    http.listen (PORT,()=>console.log(`El servidor esta funcionando ${PORT}`));
}).catch (console.log)
