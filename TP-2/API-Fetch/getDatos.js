// Grupo AL: 
// Diak Demian, Labra Andres, Ortiz Micaela Giselle y Sanchez Ezequiel Eduardo

// TP 2 JS Fecth y FileSystem

// Módulo fs 
const fs = require('fs').promises;

// 1 Utilizar la API fake store api
const url = 'https://fakestoreapi.com/products';

// 1.1 Recuperar la información de todos los productos
async function recuperarProductos() {
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error ('Ocurrió un error:' + response.status);
        }
        const datos = await response.json();
        console.log('--- 1.1 GET de todos los productos ---');
        console.log(datos);
    } catch(error){
        console.log('error', error);
    }
}

// recuperarProductos();

// 1.2 Recuperar la información de un número limitado de productos
async function recuperarAlgunosProductos(hasta){
    try{
        const response = await fetch(`${url}?limit=${hasta}`);
        if (!response.ok){
            throw new Error ('Ocurrió un error:' + response.status);
        }
        const datos = await response.json();
        console.log(`\n--- 1.2 Se recuperaron ${hasta} productos. ---`)            
        console.log(datos);
        return datos;      
    } catch(error) {
        console.log('error', error);
    }
}


// 1.3 Persistir los datos de la consulta en un archivo local JSON

const persistirDatos = async (datosParaPersistir) => {
    try{
        // obtengo los datos de la consulta anterior
        const datos = await datosParaPersistir;

        if (datos){
            const productos = JSON.stringify(datos, null, 2);
            console.log('--- Escribiendo en el archivo ---');

            await fs.writeFile('./productos.json', productos);
            console.log('\n --- 1.3 El archivo se guardó con éxito. ---');

        }

    }catch (error){
        console.log(error);
    }
}

// const algunosProductos = recuperarAlgunosProductos(3);
// persistirDatos(algunosProductos);

// 1.4 Agregar un nuevo producto (POST)

async function nuevoProducto(producto){
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto)
        })
        if (!response.ok){ 
            throw new Error('Error ' + response.status)
        }
        
        const datos = await response.json();
        console.log(`\n --- 1.4 El nuevo producto ${producto.title} se guardó con éxito. ---`);
        console.log(datos);

    } catch (error) {
        console.log(error)
    }
}

const producto = {
    title: 'double door refrigerator', 
    price: 1000,
}

// nuevoProducto(producto);


// 1.5 Buscar la información de un determinado producto, utilizando un “id” como parámetro (GET).

async function buscarporId(id){
    try{
        const response = await fetch(`${url}/${id}`); 
        if (!response.ok){
            throw new Error ('Ocurrió un error:' + response.status);
        }
        const datos = await response.json();
        console.log(`\n--- 1.5 Se recupero la información del producto con id ${id}:. ---`)            
        console.log(datos);
        return datos;      
    } catch(error) {
        console.log('error', error);
    }
}

// buscarporId(3);

// 1.6 Eliminar un producto determinado, utilizando DELETE

async function eliminarPorId(id){
    try{
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

        if(!response.ok){
            throw new Error('Ocurrio un error:' + response.status);
        }

        const datos = await response.json();
        console.log(`\n--- 1.6 Se eliminó el producto con el id: ${id} con el status: ${response.status}:. ---`)
        console.log(datos);

    } catch (error) {
        console.error(error);
    }
}

// eliminarPorId(3);

// 1.7 Modificar los datos de un producto, utilizando UPDATE

async function modificarProducto(id, title, price){
    try{
        const productoActualizado = {
            title: title,
            price: price
        };

        const response = await fetch(`${url}/${id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoActualizado)
        });

        if (!response.ok){
            throw new Error( 'Ocurrio un error:' + response.status );
        }

        const datos = await response.json();
        console.log(`\n--- 1.7 Se modificó el producto con el status: ${response.status}:. ---`)
        console.log(datos);

    } catch (error){
        console.error(error);
    }
}

// modificarProducto(2, 'Producto Modificado', 99.99)

//FS

async function leerJson(){
    const lectura = await fs.readFile('./productos.json', 'utf-8');
    return lectura;
}

const agregarProductoFs = async (productoAgregar) => {
    try {
        const lectura = await leerJson();
        const datos = await JSON.parse(lectura);
        console.log(`\n--- 1.8 Datos actuales en el archivo:. ---`)
        console.log(datos);

        datos.push(productoAgregar);

        const datosGuardar = JSON.stringify(datos)
        fs.writeFile('./productos.json', datosGuardar);
        console.log(`\n--- 1.8 Se agregó el producto ${productoAgregar.title} en el archivo con id: ${productoAgregar.id}:. ---`);
        console.log(datos);

    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

const productoAgregar = {
    id: 10,
    title: "Don Quijote de la Mancha",
    price: 25.25,
    description: "La historia de un loco disfrazado de héroe",
    category: "libros",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
    rating: {
        rate: 5,
        count: 30
    }
};

const eliminarMenor100 = async () => {
    try {
        const lectura = await leerJson();
        const datos = await JSON.parse(lectura);
        const Menor100 = datos.filter(d => d.price > 100);
        console.log(`\n--- 1.9 Se eliminaron todos los productos menores a $100:. ---`);
        console.log(Menor100);
    } catch (err) {
        console.error(`Error: ${err}`)
    }
};

//EJECUTAR CODIGO EN ORDEN CON TIMEOUT

function retraso(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ejecutarEnOrden() {
  await retraso(1000);
  await recuperarProductos();

  await retraso(1000);
  await persistirDatos(recuperarAlgunosProductos(3));

  await retraso(1000);
  await nuevoProducto(producto);

  await retraso(1000);
  await buscarporId(3);

  await retraso(1000);
  await eliminarPorId(3);

  await retraso(1000);
  await modificarProducto(2, 'Producto Modificado', 99.99);

  await retraso(1000);
  await agregarProductoFs(productoAgregar);

  await retraso(1000);
  await eliminarMenor100();
}

ejecutarEnOrden();