// Grupo AL: 
// Diak Demian, Labra Andres, Ortiz Micaela Giselle y Sanchez Ezequiel Eduardo

// TP 1 JS Arrays

// 1.3 Declaración del array con objetos JavaScript
let manuales = [
    {id: 1, nombre: "Matematicas con Jorge", precio: 30.000, stock: 40},
    {id: 2, nombre: "English World!", precio: 50.000, stock: 0},
    {id: 3, nombre: "Historia Peninsular", precio: 50.000, stock: 2},
    {id: 4, nombre: "Programacion con Java", precio: 20.000, stock: 0},
    {id: 5, nombre: "Vida y estilo", precio: 15.000, stock: 5}
];

// Funcion para mostrar los manuales
function mostrarManuales(){
    manuales.forEach(m => {
        console.log(`ID: ${m.id} | Nombre: ${m.nombre} | Precio: $${m.precio} | Stock: ${m.stock}`);
    });
};

console.log("\n--- 1.3 Manuales originales ---");
console.log (manuales);

// 2. OPERACIONES BÁSICAS Y ACCESO
// 2.1 Longitud total del array 
console.log("\n--- 2.1 Longitud total del array Manuales: ---");
console.log(`La longitud total del array es de: ${manuales.length} elementos.`);

// 2.2 Nombre del segundo y cuarto elemento del array utilizando su índice:
console.log("\n--- 2.2 Segundo elemento y cuarto elemento de Manuales: ---");
console.log(`| Nombre del segundo elemento: ${manuales[1].nombre} \n| Nombre del cuarto elemento: ${manuales[3].nombre}`);

// 3. RECORRIDO DEL ARRAY
// 3.1 Recorrido del array Manuales con bucle for of: ---
console.log("\n--- 3.1 Recorrido del array Manuales con bucle for of: ---");
for (let manual of manuales) {
    console.log(`${manual.nombre} - $${manual.precio}`)
};

// 3.2 Recorrido del array Manuales con el método forEach
console.log("\n--- 3.2 Recorrido del array Manuales con el metodo forEach: ---");
manuales.forEach(m => {
    console.log(`| Manual: ${m.nombre} | Precio: $${m.precio}`)
});

// 4. MANIPULACIÓN DE ARRAYS

// 4.1 Agregar dos elementos con el método push():
const marquez = {id: 6, nombre: "Cien años de soledad", precio: 12.000, stock: 4};
const quijote = {id: 7, nombre: "Don Quijote de la Mancha", precio: 25.000, stock: 2};

manuales.push(marquez);
manuales.push(quijote);

console.log("\n--- 4.1 Se agregaron dos elementos al final del array---");
mostrarManuales();

// 4.2 Eliminar el último elemento con el método pop():
manuales.pop();
console.log("\n--- 4.2 Se eliminó el último elemento con pop(): ---");
mostrarManuales();

// 4.3 Agregar nuevo elemento al inicio con el método unshift():
const romeo = {id: 8, nombre: "Romeo y Julieta", precio: 50.000, stock: 3};
manuales.unshift(romeo);
console.log("\n--- 4.3 Se agregó un nuevo elemento al inicio con unshift(): ---");
mostrarManuales();

// 4.4 Eliminar el primero elemento con el método shift():
manuales.shift();
console.log("\n--- Se eliminó el primer elemento con shift(): ---");
mostrarManuales();

// 4.5 Crear nuevo array solo con manuales con stock usando el método filter()
let manualesConStock = manuales.filter(manual => manual.stock > 0);
console.log("\n--- 4.5 Nuevo array de manuales con stock usando filter(): ---");
manualesConStock.forEach(p => {
console.log(`Stock: ${p.stock} | ID: ${p.id} | Nombre: ${p.nombre} | Precio: $${p.precio} `);
});

// 4.6 Crear nuevo array solo con nombres usando el método map()
const nombresManuales = manuales.map(manual => manual.nombre);
console.log("\n--- 4.6 Nuevo array de nombres de los manuales usando map(): ---");
for (const nombre of nombresManuales) {
    console.log(nombre); 
}
    
// 4.7 Encontrar y guardar en una variable un ID usando el método FIND()
let idBuscado = 3;
let manual = manuales.find(indice => indice.id === idBuscado);
if (manual === undefined) {
    console.log(`\n El manual con id ${idBuscado} no se encontró.`);
} else {
    console.log(`\n--- 4.7 El manual con id ${idBuscado} se encontró con éxito: ---`);
    console.log(`ID: ${manual.id} | Nombre: ${manual.nombre} | Precio: $${manual.precio} | Stock: ${manual.stock}`);
}

// 4.8 Crear un nuevo array y ordenar por precio con el método sort()
const manualesOrdenados = [...manuales].sort((a, b) => {
    return b.precio - a.precio;
});
console.log(`\n--- 4.8 Manuales ordenados por precio de manera decreciente con sort(): ---`);
console.log(manualesOrdenados);