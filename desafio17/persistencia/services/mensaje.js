const MensajeDAO=require('../models/dao/mensaje')
class mensajeService{
	constructor(){}
	async createMensaje(mensaje){
		return MensajeDAO.createMensaje(mensaje);
	}
	async vistaMensaje(){
		return MensajeDAO.vistaMensajes();
	}
}
module.exports=new mensajeService();