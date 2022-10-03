// DECLARAR VARIABLES PARA LOS ELEMENTOS DEL DOM
let titulo = document.querySelector("#titulo");
let seccionProducto = document.querySelector("#producto");
let descripcion = document.querySelector("#desc");
let urlImagen = document.querySelector("#dirImg");
let botonUno = document.querySelector("#btn_uno");
let botonDos = document.querySelector("#btn_dos");

//DECLARO EL ARRAY DE PRODUCTOS, VACÍO.
let arrayProductos = [];
//DECLARO EL FORMATO DEL PRODUCTO, NO NECESARIO, PERO INFORMATIVO
let producto = {
    descripcion: "",
    imagen: ""
}
// VARIABLES AUXILIARES
let des, img;

if (localStorage.getItem('productos')) {
    arrayProductos = JSON.parse(localStorage.getItem('productos'));
} else {
    //ASIGNO MANUALMENTE EL PRIMER PRODUCTO
    //fuente de productos: https://revistabyte.es/recomendamos/productos-tic-mas-vendidos-amazon/

    producto = {
        descripcion: "Fire TV Stick 4K Ultra HD con mando por voz Alexa",
        imagen: "https://revistabyte.es/wp-content/uploads/2020/05/1-323x360.jpg.webp"
    }
    //LO AGREGO AL ARRAY
    arrayProductos.push(producto);

    //ASIGNO MANUALMENTE EL SEGUNDO PRODUCTO
    producto = {
        descripcion: 'TV Samsung 4K UHD de 50”',
        imagen: "https://revistabyte.es/wp-content/uploads/2020/05/4-425x360.jpg.webp"
    }
    arrayProductos.push(producto);
}
//INYECTO LOS PRODUCTOS DEL ARRAY EN LA SECCIÓN PRODUCTO
document.querySelector("#producto").innerHTML = armaTemplate();

//FUNCIÓN QUE SE INVOCA DESDE LA INTERFAZ PARA CARGAR NUEVOS ARTÍCULOS
function agregar() {
    //TOMO LOS VALUES DE DESCRIPCIÓN E IMAGEN DE LA INTERFAZ
    des = descripcion.value.trim();
    img = urlImagen.value.trim();

    if(des.length === 0 || img.length === 0){
        return;
    }
        
    
    //ARMO EL OBJETO
    producto = {
        descripcion: des,
        imagen: img
    }
    //AGREGO EL PRODUCTO AL ARRAY
    arrayProductos.push(producto);
    console.log(arrayProductos);

    //SIGO EL MISMO PROCEDIMIENTO QUE CUANDO SE HACÍA MANUAL, LÍNEA 112
    seccionProducto.innerHTML = armaTemplate();
}

//FUNCION QUE ARMA EL TEMPLATE DE ARTÍCULOS CON LOS PRODUCTOS DEL ARRAY Y RETORNA EL TEMPLATE
function armaTemplate() {
    let template = '';
    for (let i = 0; i < arrayProductos.length; i++) {
        producto = arrayProductos[i];
        template += `<article>  
                                <div class="edicionImg">
                                <div class="trash" onclick="eliminarItem(${i})"><img src="papelera.png"></div>
                                <div class="edit" onclick="editarItem(${i})"><img src="pincel.png"></div>
                                </div>
                                <h3 class="descripcion">${producto.descripcion}</h3>
                                <img src="${producto.imagen}" class="imagen">
                    </article>`
    }
    return template;
}

function listado() {
    if (arrayProductos.length > 0 )localStorage.setItem('productos', JSON.stringify(arrayProductos));
    location.href = 'resultados.html';
}

function eliminarItem(nroProd){
    console.log("hice click en el producto", nroProd);
    arrayProductos.splice(nroProd,1);
    if(arrayProductos.length === 0) {
        localStorage.removeItem("productos");}
    else{
        localStorage.setItem('productos', JSON.stringify(arrayProductos));
    }
    seccionProducto.innerHTML = armaTemplate();
}

function editarItem(nroProd){
    console.log("hice click en editar el prod", nroProd)
    titulo.innerHTML = "Edicion de producto";

    producto = arrayProductos[nroProd];
    descripcion.value = producto.descripcion;
    urlImagen.value = producto.imagen;

    botonUno.value = "Modificar";
    botonUno.classList.add("color_green");
    botonDos.value = "Cancelar";
    botonDos.classList.add("color_red");

    seccionProducto.innerHTML = armaTemplateSinBotones();

    botonUno.setAttribute("onclick", `modificarItem(${nroProd})`);
    botonDos.setAttribute("onclick", "limpiarCancelar()");

}

function armaTemplateSinBotones(){
    let template = '';
    for (let i = 0; i < arrayProductos.length; i++) {
        producto = arrayProductos[i];
        template += `<article>  
                                <h3 class="descripcion">${producto.descripcion}</h3>
                                <img src="${producto.imagen}" class="imagen">
                    </article>`
    }
    return template;

}

function modificarItem(nroProd){
    des = descripcion.value.trim();
    img = urlImagen.value.trim();
    if (des.length === 0 || img.length === 0) return;
    producto = {
        descripcion: des,
        imagen: img
    }
    arrayProductos[nroProd] = producto;

    limpiarCancelar();
    localStorage.setItem('productos', JSON.stringify(arrayProductos));
}

function limpiarCancelar(){
    descripcion.value = "";
    urlImagen.value = "";
    titulo.innerHTML = "Nuevo Producto";
    botonUno.value = "Agregar";
    botonDos.value = "Listado";
    botonUno.classList.remove("color_green");
    botonDos.classList.remove("color_red");
    botonUno.setAttribute("onclick","agregar()");
    botonDos.setAttribute("onclick", "listado()");

    seccionProducto.innerHTML = armaTemplate();
}

let seccionAgrego = document.querySelector("#agrego");

function buscarProductos(){
    console.log("hola")
    seccionAgrego.classList.add("bloquear");
    let aBuscar =  document.querySelector("#aBuscar").value;
    if (aBuscar.trim().length === 0){
        seccionProducto.innerHTML = armaTemplateSinBotones();
    }else{
        let array_busqueda = [], k = -1;
        // array_busqueda = arrayProductos.filter(elemento => elemento.descripcion.startsWith(aBuscar));
        for (let i = 0; i < arrayProductos.length; i++) {
            producto = arrayProductos[i];
            if (producto.descripcion.toLowerCase().includes(aBuscar.toLowerCase())) {
                k++;
                array_busqueda[k] = i;
            }
            
        }
        console.log("Array_busqueda: ",array_busqueda);
        seccionProducto.innerHTML = armaTemplateBusqueda(array_busqueda);
    }


}

function armaTemplateBusqueda(array_busqueda){
    let template = '', indice = 0;
    for (let i = 0; i < array_busqueda.length; i++) {
        indice = array_busqueda[i];
        producto = arrayProductos[indice];
        template += `<article>
                        <h3 class="descripcion">${producto.descripcion}</h3>
                        <img src="${producto.imagen}" class="imagen">
                    </article>`
    }
    return template;
}


function salirBusqueda(){
    console.log("chao")
    seccionAgrego.classList.remove("bloquear");
    aBuscar.value = "";
    seccionProducto.innerHTML = armaTemplate();

}