/*FUNCION BARRA LATERAL PAGINA PRINCIPAL*/

function abrirBarra() {

    document
        .getElementById("barraLateral")
        .classList.add("abierta");

    document
        .getElementById("fondoLateral")
        .classList.add("activo");
}


function cerrarBarra() {

    document
        .getElementById("barraLateral")
        .classList.remove("abierta");

    document
        .getElementById("fondoLateral")
        .classList.remove("activo");
}



/*SLIDER DE PRODUCTOS*/

let slideActual = 0;

const slides = document.querySelectorAll(".slide");

const indicadores = document.querySelectorAll(".indicador");


/*MOSTRAR SLIDE*/


function mostrarSlide(numero) {

    if (slides.length === 0) return;

    slides.forEach(function(slide) {
        slide.classList.remove("activo");
    });

    indicadores.forEach(function(indicador) {
        indicador.classList.remove("activo");
    });

    /*Activar la diapositiva si existe*/

    if (slides[numero]) {
        slides[numero].classList.add("activo");
    }

    /*Activar el indicador solo si existe*/

    if (indicadores[numero]) {
        indicadores[numero].classList.add("activo");
    }
}


/*CAMBIAR SLIDE*/

function cambiarSlide(direccion) {

    slideActual += direccion;


    if (slideActual >= slides.length) {

        slideActual = 0;

    }


    if (slideActual < 0) {

        slideActual = slides.length - 1;

    }


    mostrarSlide(slideActual);

}


/*CAMBIO AUTOMATICO*/

setInterval(function() {

    cambiarSlide(1);

}, 5000);



/*ANIMACION AMIGURUMIS AL HACER SCROLL*/

const amigurumis = document.querySelectorAll(".tarjeta-amigurumi");

const observadorAmigurumis = new IntersectionObserver(
    (tarjetas) => {

        tarjetas.forEach((tarjeta) => {

            if (tarjeta.isIntersecting) {

                tarjeta.target.classList.add("visible");

                observadorAmigurumis.unobserve(tarjeta.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

 amigurumis.forEach((tarjeta) => {
    observadorAmigurumis.observe(tarjeta);
});





/*MODAL VER DETALLES*/

 const modalProducto = document.getElementById("modalProducto");

 let productoActualModal = null;

 if (modalProducto) {

    const cerrarModal = document.getElementById("cerrarModal");

    const imagenModal = document.getElementById("imagenModal");

    const nombreModal = document.getElementById("nombreModal");

    const nombreImagenModal =
        document.getElementById("nombreImagenModal");

    const idiomaModal =
        document.getElementById("idiomaModal");

    const descripcionModal =
        document.getElementById("descripcionModal");

    const ingredientesModal =
        document.getElementById("ingredientesModal");

    const precioModal =
        document.getElementById("precioModal");

    const botonCarritoModal =
    document.getElementById("botonCarritoModal");

    const botonComprarModal = document.getElementById("botonComprarModal");




    /*BUSCAR BOTON VER DETALLES*/

    const botonesDetalles =
        document.querySelectorAll(".ver-producto");



    /*SE PRESIONA VER DETALLES*/

    botonesDetalles.forEach((boton) => {

        boton.addEventListener("click", () => {

            /*ENCONTRAR LA TARJETA*/

            const tarjeta = boton.closest(".tarjeta-producto");
            productoActualModal = tarjeta; 


            /*OBTENER INFORMACION*/

            const imagen =
                tarjeta.querySelector("img").src;

            const nombre =
                tarjeta.querySelector("h3")
                .textContent
                .trim();

            const descripcion =
                tarjeta.querySelector("p")
                .textContent
                .trim();

            const precio =
                tarjeta.querySelector(".precio-producto")
                .textContent
                .trim();



            /*PASAR INFORMACION AL MODAL*/

            imagenModal.src = imagen;

            imagenModal.alt = nombre;

            nombreModal.textContent = nombre;

            nombreImagenModal.textContent = nombre;

            descripcionModal.textContent =
                descripcion;

            precioModal.textContent =
                precio;


            /*NOMBRE ORIGINAL*/

            idiomaModal.textContent =
                tarjeta.dataset.idioma || "";



            /*MOSTAR INGREDIENTES*/

            ingredientesModal.innerHTML = "";


            const ingredientes =
                tarjeta.dataset.ingredientes
                ? tarjeta.dataset.ingredientes.split("|")
                : [];


            ingredientes.forEach((ingrediente) => {

                const li =
                    document.createElement("li");

                li.textContent =
                    ingrediente.trim();

                ingredientesModal.appendChild(li);

            });


            /*MOSTRAR MODAL*/

            modalProducto.classList.add("activo");

            document.body.style.overflow =
                "hidden";

        });

    });


    /*CERRAR CON EL BOTON X*/

    cerrarModal.addEventListener("click", () => {

        modalProducto.classList.remove("activo");

        document.body.style.overflow = "";

    });


    /*CERRAR HACIENDO CLICK AFUERA*/

    modalProducto.addEventListener("click", (evento) => {

        if (evento.target === modalProducto) {

            modalProducto.classList.remove("activo");

            document.body.style.overflow = "";

        }

    });


    /*CERRAR CON TECLA ESC*/

    document.addEventListener("keydown", (evento) => {

        if (evento.key === "Escape") {

            modalProducto.classList.remove("activo");

            document.body.style.overflow = "";

        }

    });

   
 /*AÑADIR AL CARRITO*/

 botonCarritoModal.addEventListener("click", () => {

    if (!productoActualModal) return;

    agregarAlCarrito(productoActualModal);
 });



 /*BOTON COMPRAR AHORA*/

 botonComprarModal.addEventListener("click", () => {

    const nombre = nombreModal.textContent;

    alert(
        "Has seleccionado comprar " +
        nombre +
        " 🛍️"
    );

 });


}


/*CARRITO DE COMPRAS*/

let carrito = [];

function agregarAlCarrito(tarjeta) {
    const nombre = tarjeta.querySelector("h3").textContent;
    const precioTexto = tarjeta.querySelector(".precio-producto").textContent;
    const precio = Number(precioTexto.replace(/[^\d]/g, ""));
    const imagen = tarjeta.querySelector("img")?.src || "";

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1,
            image_url: imagen
        });
    }

    alert(nombre + " fue añadido al carrito 🛒");
    actualizarCarrito();
}


/*AGREGAR PRODUCTOS AL CARRITO FUNCION*/

function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    if (!listaCarrito || !totalCarrito) return;

    listaCarrito.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
    }

    carrito.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const elemento = document.createElement("div");
        elemento.classList.add("producto-carrito");

        elemento.innerHTML = `
            <p><strong>${producto.nombre}</strong></p>
            <p>Precio: $${producto.precio.toLocaleString("es-CO")}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Subtotal: $${subtotal.toLocaleString("es-CO")}</p>
            <hr>
        `;

        listaCarrito.appendChild(elemento);
    });

    totalCarrito.textContent = "$" + total.toLocaleString("es-CO");
}



/*ABRIR Y CERRAR CARRITO*/

const modalCarrito = document.getElementById("modalCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");

const botonesCarrito = document.querySelectorAll(".carrito");

botonesCarrito.forEach((boton) => {
    boton.addEventListener("click", abrirCarrito);
});

function abrirCarrito() {
    if (modalCarrito) {
        modalCarrito.classList.add("activo");
    }
}

function cerrarVentanaCarrito() {
    if (modalCarrito) {
        modalCarrito.classList.remove("activo");
    }
}

if (cerrarCarrito) {
    cerrarCarrito.addEventListener("click", cerrarVentanaCarrito);
}


/*BOTONES + DE LOS PRODUCTOS*/

const botonesAgregar = document.querySelectorAll(".agregar-carrito");

botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const tarjeta = boton.closest(".tarjeta-producto");

        if (tarjeta) {
            agregarAlCarrito(tarjeta);
        }
    });
});


/*CONFIGURACIÓN DE EMAILJS*/

const EMAILJS_PUBLIC_KEY = "XXeJxMIzEFdNkkEs2";
const EMAILJS_SERVICE_ID = "service_tb5cbwe";
const EMAILJS_TEMPLATE_ID = "template_84klhog";


/*Inicializar EmailJS*/
emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
});




/*ENVIAR PEDIDO POR EMAILJS*/
const botonFinalizarCompra = document.getElementById("finalizarCompra");

if (botonFinalizarCompra) {
    botonFinalizarCompra.addEventListener("click", async () => {

        /*Verificar que haya productos en el carrito*/
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Agrega productos primero 🛒");
            return;
        }

        /*Crear la lista de productos del pedido*/
        const orderDetails = carrito.map(producto => {
            const subtotal = producto.precio * producto.cantidad;

            return `${producto.nombre} x ${producto.cantidad} - $${subtotal.toLocaleString("es-CO")}`;
        }).join("\n");

        /*Calcular el total*/
        const total = carrito.reduce((suma, producto) => {
            return suma + producto.precio * producto.cantidad;
        }, 0);

        const orderTotal = `$${total.toLocaleString("es-CO")} COP`;

        /*Evitar varios envíos al mismo tiempo*/
        botonFinalizarCompra.disabled = true;
        botonFinalizarCompra.textContent = "Enviando pedido...";

        
try {
    await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
            order_id: Date.now().toString(),
            orders: carrito.map(producto => ({
                name: producto.nombre,
                units: producto.cantidad,
                price: (
                    producto.precio * producto.cantidad
                ).toLocaleString("es-CO"),

                image_url: producto.image_url

            })),

            cost: {
                shipping: "0",
                tax: "0",
                total: total.toLocaleString("es-CO")
            }
        }
    );

    alert("¡Pedido enviado correctamente! 💗");

    carrito = [];
    actualizarCarrito();

} 

catch (error) {
    console.error("Error al enviar el pedido:", error);
    alert("No se pudo enviar el pedido. Revisa la configuración de EmailJS e inténtalo de nuevo.");

} 

finally {
    botonFinalizarCompra.disabled = false;
    botonFinalizarCompra.textContent = "Continuar con el pedido";
}

});

}

