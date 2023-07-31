const productos = [
    {
        id:"pulsera-neva",
        titulo: "Choker Neva",
        imagen: "Assets/Collares/collar-1.png",
        categoria: {
            nombre:"Collares",
            id: "collares",
        },
        precio: 15000
    },

    {
        id:"pulsera-ganges",
        titulo: "Pulsera Ganges",
        imagen: "Assets/pulseras/pulsera-1.png",
        categoria: {
            nombre:"Pulseras",
            id: "pulseras",
        },
        precio: 14000
    },

    {
        id:"collar-amur",
        titulo: "Collar Amur",
        imagen: "Assets/Collares/collar-2.png",
        categoria: {
            nombre:"Collares",
            id: "collares",
        },
        precio: 12000
    },

    {
        id:"pulsera-lena",
        titulo: "Esclava Lena",
        imagen: "Assets/pulseras/pulsera-2.png",
        categoria: {
            nombre:"Pulseras",
            id: "pulseras",
        },
        precio: 11000
    },

    {
        id:"collar-orinoco",
        titulo: "Collar Orinoco",
        imagen: "Assets/Collares/collar-3.png",
        categoria: {
            nombre:"Collares",
            id: "collares",
        },
        precio: 20000
    },

    {
        id:"pulsera-tiber",
        titulo: "Pulsera Tiber",
        imagen: "Assets/pulseras/pulsera-3.png",
        categoria: {
            nombre:"Pulseras",
            id: "pulseras",
        },
        precio: 15000
    },

    {
        id:"collar-tista",
        titulo: "Collar Tista",
        imagen: "Assets/Collares/collar-4.png",
        categoria: {
            nombre:"Collares",
            id: "collares",
        },
        precio: 28000
    },
    {
        id:"pulsera-perlas",
        titulo: "Pulsera Perlas",
        imagen: "Assets/pulseras/pulsera-4.png",
        categoria: {
            nombre:"Pulseras",
            id: "pulseras",
        },
        precio: 10000
    },

    {
        id:"collar-lagen",
        titulo: "Collar Lagen",
        imagen: "Assets/Collares/collar-5.png",
        categoria: {
            nombre:"Collares",
            id: "collares",
        },
        precio: 25000
    },



   

];

const contendorProductos = document.querySelector ("#contenedor-productos");
const botonesCategorias = document.querySelectorAll (".boton-categoria");
let botonesAgregar = document.querySelectorAll (".producto-agregar");
const numeroCarrito = document.querySelector ("#numero-carrito");

function cargarProductos(prodcutosSeleccionados) {

    contendorProductos.innerHTML = "";

    prodcutosSeleccionados.forEach(producto => {

        const div = document.createElement ("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">  
                <div class="producto-detalles-info"> 
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                     <p class="producto-precio">$ ${producto.precio}</p> 
                </div>
                    
             <button class="producto-agregar" id= "${producto.id}"><i class="bi bi-cart-plus pr-2"></i> Agregar al carrito</button>
            
        `;

        contendorProductos.append(div);
    }) 

    actualizarBotonesAgregar ();
}

cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("seleccionado"));
        e.target.classList.add("seleccionado");

        if (e.target.id != "todos") {
            const categoriaSeleccionada = productos.filter(producto => producto.categoria.id === e.target.id);
            cargarProductos(categoriaSeleccionada);
        } else {
            cargarProductos(productos);

        }
        

    })
});


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll (".producto-agregar");

    botonesAgregar.forEach (boton => { 
        boton.addEventListener ("click", agregarAlCarrito)
    });

}

let productosEnCarrito;

let productosEnCarritoLocalStorage = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLocalStorage) {

    productosEnCarrito = JSON.parse(productosEnCarritoLocalStorage);
    actualizarNumeroCarrito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.target.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {

       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;

    } else {
        productoAgregado.cantidad =1;
        productosEnCarrito.push(productoAgregado);
    }  

    actualizarNumeroCarrito ();


    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

function actualizarNumeroCarrito() { 
    let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumeroCarrito;
}