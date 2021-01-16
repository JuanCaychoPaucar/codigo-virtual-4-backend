const { Imagen } = require('../config/Sequelize');

// ambas librerias vienen instaladas nativamente en NodejS y por ende solo trabajan en dicho entorno
// fs => libreria para el manjeo de archivos dentro del proyecto. Sirve para insertar, editar o eliminar archivos desde un js
// path => sirve para devolver archivos del servidor
// https://nodejs.org/api/fs.html
//https://nodejs.org/api/path.html

const fs = require('fs');
const path = require('path');

const subirImagen = async (req, res) => {
    try {
        console.log(req.files.imagen);  // maneja todo el tratamiento de archivos mandados por el front

        let { imagen } = req.files;  // nuestra llave

        // // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/includes
        if (imagen && imagen.type.includes("image")) {  // validar que se carguen archivos de tipo image
            let ruta = imagen.path  // ruta del archivo

            // separar la ruta y quitar todo. Solamente quedarme con el nombre del archivo
            // [ 'src', 'multimedia', 'nombre_archivo.png' ]
            let nombreArchivo = ruta.split('\\')[2];

            let imagenCreada = await Imagen.create({
                imagenURL: nombreArchivo
            });

            return res.json({
                ok: true,
                content: imagenCreada,
                message: 'Se subió la imagen correctamente al servidor'
            });
        } else {
            // Object.keys() => metodo de la clase object que cuando yo le pase un JSON agarra todas las llaves y me las devuelve en forma de un array
            // console.log(Object.keys(req.files));
            let llave = Object.keys(req.files)[0];  // nuestra llave debe llamarse imagen
            // console.log(llave);
            if (llave) {
                let ruta = req.files[llave].path;
                console.log(ruta);

                // eliminar ese archivo del serrvidor
                fs.unlink(ruta, (errorEliminacion) => {
                    console.log(errorEliminacion);
                });
            }

            return res.status(402).json({
                ok: false,
                content: null,
                message: 'Falta la imagen a subir'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al registrar la imagen'
        });
    }

}


const devolverImagenPorId = async (req, res) => {
    let { id } = req.params;
    let imagen = await Imagen.findByPk(id);

    if (imagen) {
        console.log(imagen);
        let ruta = `src/multimedia/${imagen.imagenURL}`;
        let rutaDefault = `src/multimedia/default.jpg`;

        // verifica si existe ese archivo en el pryecto y retorna ture si existe, y flase si no existe
        console.log(fs.existsSync(ruta));
        if (fs.existsSync(ruta)) {
            // resolve sirve para mostrar el archivo
            // sendFile sirve para mandar al cliente(front) un archivo y solamente un archivo, sin cmpos adicionales
            return res.sendFile(path.resolve(ruta));
        }
        else {
            return res.sendFile(path.resolve(rutaDefault));
        }
    } else {
        return res.status(404).json({
            ok: false,
            content: null,
            message: 'No existe esa imagen'
        });
    }

}


const actualizarImagen = async (req, res) => {
    // actualizar la imagen tanto en la BD como en el servidor
    let { id } = req.params;
    let { imagen } = req.files;

    // primero busco esa imagen segun su pk en la BD
    let imagenEncontrada = await Imagen.findByPk(id);
    console.log(imagenEncontrada);

    if (imagenEncontrada) {
        let ruta = `src/multimedia/${imagenEncontrada.imagenURL}`;

        // verificamos si existe o no en el servidor
        if (fs.existsSync(ruta)) {
            let rpta = fs.unlinkSync(ruta);
            console.log("verificacion", rpta);
        }
        let nombreArchivo = imagen.path.split("\\")[2];
        await Imagen.update({ imagenURL: nombreArchivo }, {
            where: {
                imagenId: id
            }
        })

        // consultamos nuevamente en la BD
        imagenEncontrada = await Imagen.findByPk(id);
        return res.json({
            ok: true,
            content: imagenEncontrada,
            message: 'Imagen actualizada con exito'
        });
    } else {
        return res.status(404).json({
            ok: false,
            content: null,
            message: 'No existe esa imagen'
        });
    }
}


module.exports = {
    subirImagen,
    devolverImagenPorId,
    actualizarImagen
}


/**
 * https://www.npmjs.com/package/connect-multiparty
 * npm install connect-multiparty
 *
 */


/**

{
    fieldName: 'imagen',
        originalFilename: 'real madrid.png',
        path: 'src\\multimedia\\jU6w_7dPU1wdIGoo2nSt2eD4.png',
        headers: {
            'content-disposition': 'form-data; name="imagen"; filename="real madrid.png"',
            'content-type': 'image/png'
        },
    size: 28681,
        name: 'real madrid.png',
        type: 'image/png'
}
 */
