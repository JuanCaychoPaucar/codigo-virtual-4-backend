// esta promesa se va a ejecutar inmediatamente
// const miPromesa = new Promise((resolve, reject) => {
//     // funcion que retorna un solo valor
//     resolve(5);

    // el reject solo se va a llamar cuando sucedio algo incorrecto dentro de la promesa
    // reject("error");
// });
// console.log(miPromesa);
// miPromesa.then(rpta => console.log(rpta));

// para ejecutar: node .\promesas.js

// el then se va a ejecutar cuando la promesa retorne un valor satisfactorio, osea entra a funcionar su resolve()
/**
 * Para usar el anidamiento de promesas, nosotros podemos retornar 2 cosas:
 * 1: Otra promesa
 * 2: Un valor cualquiera (una variable)
 */

// miPromesa
//     .then((rpta) => rpta)
//     .then((otraRpta) => Promise.resolve(otraRpta + 10))
//     .then((x) => console.log(x));


const retraso = (x) => {
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(x), 5000);
    });
}

retraso(7).then(rpta => {
    console.log(rpta);
})