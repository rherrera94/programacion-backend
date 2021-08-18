const {dbsqlite3}=require("../db/db");

class mensajeDAO{
	async createMensaje({msg,email}){
		await dbsqlite3("mensajes").insert({
				msg,
				email
			})
	}
	async vistaMensajes(){
		return dbsqlite3("mensajes").select();
	}
};
module.exports=new mensajeDAO();