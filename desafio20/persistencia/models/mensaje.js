const {Schema, model}=require("mongoose");

const mensajeSchema= new Schema({
    msg:String,
    email:String,
    hora:{type: Date, default:Date.now()}
})

module.exports=model('mensaje', mensajeSchema);