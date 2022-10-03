let arrayProductos = JSON.parse(localStorage.getItem('productos'));
console.log(arrayProductos);
let producto = {
    descripcion: '',
    imagen: '',
}
let html = '<table><thead><th>Descripción</th><th>Imagen</th></thead><tbody>';
for (let i = 0; i < arrayProductos.length; i++) {
    producto = arrayProductos[i];
    html += `<tr><td>${producto.descripcion}</td><td><img src="${producto.imagen}"></td></tr>`;
}
html += "</table></tbody>";
document.querySelector('.tabla').innerHTML = html;