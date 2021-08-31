const msgModel=require("../mensaje");

class mensajeDAO{
	async createMensaje({msg,email}){
		await msgModel.create({msg,email});
	}
	async vistaMensajes(){
		return msgModel.find();
	}
};
module.exports=new mensajeDAO();