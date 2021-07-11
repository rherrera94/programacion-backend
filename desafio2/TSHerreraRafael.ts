
import{Suma}  from './suma';
import {Resta} from './resta';
function operacion (number1:number, tipoOperacion:string,number2:number){
    /*if (tipoOperacion=="suma"){
        let sumar=new Suma(number1,number2);
        return await sumar.resultado() ;
    }else{
        let restar=new Resta(number1,number2);
        return await restar.resultado();
    }*/
    let promesa= new Promise((resolve, reject) => {
        if (tipoOperacion=="suma"){
            let sumar=new Suma(number1,number2);
            resolve(sumar.resultado()) ;
        }else{
            let restar=new Resta(number1,number2);
            resolve(restar.resultado());
        }   
    })
    return promesa;   
}

function operaciones(){
    operacion (2,"resta",1)
        .then((datos)=>console.log(datos));
    operacion (2,"suma",1)
        .then((datos)=>console.log(datos));
}

operaciones();