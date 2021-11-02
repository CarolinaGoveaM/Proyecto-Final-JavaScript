const botonIndex = document.querySelector('#botonNovedades');

let contenido = document.querySelector('#tablaNovedades');

botonNovedades.addEventListener('click', traer);

function traer() {
    fetch('../data/tabla.json')
        .then(res => res.json())
        .then(datos => {
            tabla(datos);
        })
}

function tabla(datos) {
    tablaNovedades.innerHTML = '';
    for (let product of datos) {
        tablaNovedades.innerHTML += `
        <tr>
                    <th scope="row">${product.id}</th>
                    <td>${product.name}</td>
                    <td>${product.title}</td>
                    <td>${product.status ? "Ingresando" : "Demorado"}</td>
                  </tr>
        `
    }
}