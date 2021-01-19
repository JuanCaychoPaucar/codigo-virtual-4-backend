let btnEnviar = document.getElementById("btnEnviar");
let nombre = document.getElementById("inputNombre");
let descripcion = document.getElementById("inputDescripcion");
let marca = document.getElementById("inputMarca");
let categorias = document.getElementById("categorias");
let precio = document.getElementById("inputPrecio");
let SKU = document.getElementById("inputSKU");
let descuento = document.getElementById("inputDescuento");
let cantidad = document.getElementById("inputCantidad");
let imagen = document.getElementById("inputImagen");
let almacenes = document.getElementById("almacenes");
let imagenMostrar = document.getElementById("imagen");
const url = "http://127.0.0.1:5000";
const formData = new FormData();

// https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/FormData
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/for...in
// https://www.w3schools.com/tags/tag_select.asp


// TAREA: Hcer algo similar para las categorias
let buscarCategorias = () => {
  fetch(url + "/categoria", {
    method: "GET",
  })
    .then((resolve) => {
      return resolve.json();
    })
    .then((data) => {
      console.log(data.content);

      // for in
      for (const key in data.content) {
        console.log(data.content[key]);

        let opcion = document.createElement("option");
        opcion.text = data.content[key].categoriaNombre;
        opcion.id = data.content[key].categoriaId;
        categorias.appendChild(opcion);
      }
    }).catch(() => {
      alert('No se pudo devolver las categorias');
    });
};
buscarCategorias();



let buscarAlmacenes = () => {
  fetch(url + "/almacen", {
    method: "GET",
  })
    .then((resolve) => {
      return resolve.json();
    })
    .then((data) => {
      console.log(data.content);

      // for in
      for (const key in data.content) {
        console.log(data.content[key]);

        let opcion = document.createElement("option");
        opcion.text = data.content[key].almacenDireccion;
        opcion.id = data.content[key].almacenId;
        almacenes.appendChild(opcion);
      }
    }).catch(() => {
      alert('No se pudo devolver los almacenes');
    });
};
buscarAlmacenes();



let enviarImagen = () => {
  formData.append("imagen", imagen.files[0]);

  var reader = new FileReader();
  reader.onload = function (e) {
    imagenMostrar.src = e.target.result;
  };
  reader.readAsDataURL(imagen.files[0]);
};
imagen.addEventListener("change", enviarImagen);

btnEnviar.addEventListener("click", async (e) => {
  e.preventDefault();
  // primero subo la imagen
  if (confirm("Seguro que quiere ingresar el producto?")) {
    let valueImagen = await fetch(url + "/subirImagen", {
      method: "POST",
      body: formData,
    });
    let rptaImagen = await valueImagen.json();
    // luego subo el producto
    console.log(almacenes.selectedIndex);
    console.log(almacenes.options[almacenes.selectedIndex].id);
    let idCategoria = categorias.options[categorias.selectedIndex].id;
    let idAlmacen = almacenes.options[almacenes.selectedIndex].id;

    let objProducto = {
      productoNombre: nombre.value,
      productoDescripcion: descripcion.value,
      productoMarca: marca.value,
      productoPrecio: precio.value,
      productoSku: SKU.value,
      productoDscto: descuento.value,
      productoCantidad: cantidad.value,
      categoria_id: idCategoria,  // TAREA: capturar el id del option categoria
      almacen_id: idAlmacen,
      imagen_id: rptaImagen.content.imagenId,
    };
    let valueProducto = await fetch(url + "/producto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objProducto)
    });
    let rptaProducto = await valueProducto.json();

    alert(rptaProducto.message)
    console.log(rptaProducto);
  }
});
// TAREA: limpiar todos los campos luego de crear el producto