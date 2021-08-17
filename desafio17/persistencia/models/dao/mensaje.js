const {dbsqlite3}=require("../db/db");

class mensajeDAO{
	async createMensaje({msg,email}){
		console.log("crear"+msg+"email"+email)
		await dbsqlite3("mensajes").insert({
			msg,
            email,
		})
		console.log("llega")
	}
	async vistaMensajes(){
		return dbsqlite3("mensajes").select();
	}
};
module.exports=new mensajeDAO();