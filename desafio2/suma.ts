export class Suma{
    private number1: number;
    private number2: number;

    public constructor (number1: number, number2:number){
        this.number1=number1;
        this.number2=number2;
    }
    public resultado (){
        return this.number1+this.number2;
    }
}


