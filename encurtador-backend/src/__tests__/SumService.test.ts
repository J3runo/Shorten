import { Divisao, Sum } from "../Services/SumService"

describe("",()=>{
    test("Deve verificar se a soma é feito corretamente", ()=>{
        const resultado = Sum(1,2);

        expect(resultado).toBe(3)
    })

    test('Deve verificar se uma divisao é feita corretamente',()=>{
        const resultado = Divisao(10,5);

        expect(resultado).toBe(2)
    })

    test('Deve gerar um erro caso o divisor seja zero',()=>{
        const resultado = Divisao(10,0);

        expect(resultado).toStrictEqual(new Error('Divisao por zero nao é permitida'))
    })
})