function matematica(a,b,operacion){
    if(isNaN(a)||isNaN(b)){
        return("los parametros con los que se realizara la operacion deben ser números")
    }
    if(operacion=='suma'){
        return a+b;
    }
    if (operacion=='resta'){
        return a-b;
    }
    if (operacion=='multiplicación'){
        return a*b;
    }
    if(operacion=='división'){
        return a/b;
    }
    return "error en la operacion solicitada"
}

module.exports={
    matematica};