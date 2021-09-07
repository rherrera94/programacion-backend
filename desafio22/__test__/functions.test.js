const {matematica}=require('../operaciones');

describe('Testing function of mathematics',()=>{
    it('Should return a result of five', ()=>{
        const valueReturn=matematica(3,2,"suma");
        expect(valueReturn).toBe(5);
    })
    it('Should return a result of five', ()=>{
        const valueReturn=matematica(7,2,"resta");
        expect(valueReturn).toBe(5);
    })
    it('Should return a result of five', ()=>{
        const valueReturn=matematica(10,2,"división");
        expect(valueReturn).toBe(5);
    })
    it('Should return a result of ten', ()=>{
        const valueReturn=matematica(5,2,"multiplicación");
        expect(valueReturn).toBe(10);
    })
    it('Should return a result of error', ()=>{
        const valueReturn=matematica(7,2,"vaca");
        expect(valueReturn).toBe("error en la operacion solicitada");
    })
    it('Debe retornar error al pasar parametros que no son numeros',()=>{
        const valueReturn=matematica("vaca",2,"suma");
        expect(valueReturn).toBe("los parametros con los que se realizara la operacion deben ser números")
    })
    it('Debe retornar error al pasar parametros que no son numeros',()=>{
        const valueReturn=matematica("vaca","vaca","división");
        expect(valueReturn).toBe("los parametros con los que se realizara la operacion deben ser números")
    })
    it('Debe retornar error al pasar parametros que no son numeros',()=>{
        const valueReturn=matematica(2,"vaca","resta");
        expect(valueReturn).toBe("los parametros con los que se realizara la operacion deben ser números")
    })
})