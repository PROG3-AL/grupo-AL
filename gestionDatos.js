// Grupo AL: 
// Diak Demian, Labra Andres, Ortiz Micaela Giselle y Sanchez Ezequiel Eduardo

// TP 1: Manuales Educativos

let manuales = [
    {id: 1, nombre: "Matematicas con Jorge", precio: "30.000", stock: 400},
    {id: 2, nombre: "English World!", precio: "50.000", stock: 0},
    {id: 3, nombre: "Historia Peninsular", precio: "150.000", stock: 200},
    {id: 4, nombre: "Programacion con Java", precio: "200.000", stock: 0},
    {id: 5, nombre: "Vida y estilo", precio: "15.000", stock: 500}
];

console.log("\n--- Manuales originales ---");
console.log (manuales);


// Longitud total del array manuales.

console.log("\n--- Longitud total del array Manuales: ---");
console.log(`La longitud total del array de manuales es: ${manuales.length}`);


// Nombre del segundo y cuarto elemento del array utilizando su índice:

console.log("\n--- Segundo elemento y cuarto elemento de Manuales: ---");
console.log(`Nombre del segundo elemento: ${manuales[1].nombre} y del cuarto elemento: ${manuales[3].nombre}`);

//Recorrido del array Manuales

console.log("\n--- Bucle for of : ---");

for (let manual of manuales) {
    console.log(`${manual.nombre} - $${manual.precio}`)
};

console.log("\n--- Metodo forEach : ---");

manuales.forEach(m => {
    console.log(`Manual: ${m.nombre}, Precio: $${m.precio}`)
});

//Manipulacion de arrays

//Metodo push():

const marquez = {id: 6, nombre: "Cien años de soledad", precio: "120.500", stock: 20};
const quijote = {id: 7, nombre: "Don Quijote de la Mancha", precio: "250.000", stock: 0};

manuales.push(marquez);
manuales.push(quijote);

function mostrarManuales(){
    manuales.forEach(m => {
        console.log(`ID: ${m.id} | Nombre: ${m.nombre} | Precio: $${m.precio} | Stock: ${m.stock}`);
    });
};

console.log("\n--- Se agregaron dos elementos ---");
mostrarManuales();

//Metodo pop():

manuales.pop();

console.log("\n--- Se elimino el último elemento: ---");
mostrarManuales();


//Metodo unshift():

const romeo = {id: 8, nombre: "Romeo y Julieta", precio: "500.000", stock: 0};
manuales.unshift(romeo);
console.log("\n--- Se agrego a un nuevo elemento al inicio: ---");
mostrarManuales();

//Metodo shift():

manuales.shift();
console.log("\n--- Se elimino el primer elemento: ---");
mostrarManuales();

// Metodo Filter()
let productosConStock = manuales.filter(manual => manual.stock > 0);
console.log("\n--- Manuales con stock mayores a 0: ---");
productosConStock.forEach(p => {
        console.log(`ID: ${p.id} | Nombre: ${p.nombre} | Precio: $${p.precio} | Stock: ${p.stock}`);
    });

// Metodo MAP()
const nombresProductos = manuales.map(manual => manual.nombre);
console.log("\n--- Nombres de los manuales ---");
for (const nombre of nombresProductos) {
    console.log(nombre); 
}
    
// Método FIND()

let idManual = 3;
let manual = manuales.find(indice => indice.id === idManual);
if (manual === undefined) {
    console.log(`\nEl manual con id ${idManual} no se encontró.`);
} else {
    console.log(`\n--- El manual con id ${idManual} se encontró: ---`);
    console.log(`ID: ${manual.id} | Nombre: ${manual.nombre} | Precio: $${manual.precio} | Stock: ${manual.stock}`);
}

// Método sort()
const productosOrdenados = [...manuales].sort((a, b) => {
    const precioA = Number(a.precio.replace (",", ""));
    const precioB = Number(b.precio.replace(",", ""));
    return precioB-precioA
});

//Resolucion si los precios fueran numeros reales
//const productosOrdenados = [...manuales].sort((a, b) => b.precio - a.precio);

console.log(`Productos ordenados de manera decreciente: ${productosOrdenados}`);