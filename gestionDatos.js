//GRUPO AL: Diak, Ortiz, Sanchez, Labra

let manuales = [
    {id: 1, nombre: "Matematicas con Jorge", precio: "30.000", stock: 400},
    {id: 2, nombre: "English World!", precio: "50.000", stock: 0},
    {id: 3, nombre: "Historia Peninsular", precio: "150.000", stock: 200},
    {id: 4, nombre: "Programacion con Java", precio: "200.000", stock: 0},
    {id: 5, nombre: "Vida y estilo", precio: "15.000", stock: 500},
];

//Imprimir la longitud total
console.log(`La longitud total del array de manuales es: ${manuales.length}`);
console.log(`Nombre del segundo elemento: ${manuales[1].nombre} y del cuarto elemento: ${manuales[3].nombre}`);

//Recorrido del array
for (let manual of manuales) {
    console.log(`${manual.nombre} - ${manual.precio}`)
};
manuales.forEach(m => {
    console.log(`Producto: ${m.nombre}. Precio: ${m.precio}`)
});

//Manipulacion de arrays
const marquez = {id: 6, nombre: "Cien años de soledad", precio: "120.500", stock: 20};
const quijote = {id: 7, nombre: "Don Quijote de la Mancha", precio: "250.000", stock: 0};
manuales.push(marquez);
manuales.push(quijote);
function mostrarManuales () {
    let mostrar = [];
    manuales.forEach(m => {
        mostrar.push(m.nombre);
    })
    return mostrar;
}
console.log(`Se agregaron dos elementos al final de la lista: ${mostrarManuales()}`);

manuales.pop();
console.log(`Se elimino el ultimo elemento de la lista: ${mostrarManuales()}`);

const romeo = {id: 8, nombre: "Romeo y Julieta", precio: "500.000", stock: 0};
manuales.unshift(romeo);
console.log(`Se agrego un primer elemento en la lista: ${mostrarManuales()}`);

manuales.shift();
console.log(`Se elimino el primer elemento en la lista: ${mostrarManuales()}`);

const productosConStock = manuales.filter(manual => {
    return manual.stock > 0;
});
console.log(`Los productos que tienen stock son: ${productosConStock}`);

const nombreProductos =  manuales.map(manual => {
    return manual.nombre;
});
console.log(`Los nombres de los productos son: ${nombreProductos}`);

let idProducto = 0;
let producto = manuales.find(indice => indice.id === idProducto);
if (producto === undefined) {
    console.log('El producto no existe');
} else {
    console.log(producto);
}

//FALTA EL SORT()