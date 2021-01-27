// https://www.npmjs.com/package/multer
// npm i multer

const { subirArchivo, eliminarArchivoFirebase } = require('../utils/manejoArchivoFirebase');
const { Usuario, Curso } = require('../config/Mongoose');

const subirImagen = async (req, res) => {
    // si usamos el multer con varios archivos, debemos usar req.files
    // si es solo un archivo, usamos req.file
    try {
        // console.log(req.file);
        let { modelo, id } = req.query;

        // VALIDAMOS QUE EL MODELO COINCIDA
        if (modelo !== 'usuario' && modelo !== 'curso') {
            return res.status(400).json({
                ok: false,
                content: null,
                message: 'Modelo no definido'
            });
        }

        let resultado = await subirArchivo(req.file); //* nos retorna el link de nuestro archivo subido a Firebase
        // console.log("Resultado", resultado); // me retorna una array

        // Luego de subir la imagen a Firebase, tendria que actualizar el usuario o el curso
        // capturamos el id
        // localhost:5000/subirImagen?modelo=usuario&id=dfj23n3j4n234n

        if (modelo === 'usuario') {
            // Usuario
            let usuario = await Usuario.findByIdAndUpdate(id, { 'usuario_imagen.imagen_url': resultado[0] }, { new: true }); // new: true => para mostrar los valores del registro actualizado
            // console.log("Modelo usuario", usuario);

            return res.status(201).json({
                ok: true,
                content: usuario,
                message: 'Se actualizo la imagen del usuario'
            });
        } else if (modelo === 'curso') {
            // Curso
            let curso = await Curso.findById(id);
            // console.log("Modelo curso", curso);
            curso.curso_imagenes.push({
                imagen_url: resultado[0]
            });

            // si nosotros, luego que busquemos un registro en la BD queremos guardar alguna modificacion, esa instancia trae un metodo save(),
            // que va a hacer la sobreescritura de lo que le hemos modificado.
            //* Es necesario usar el await para esperar el resultado, ya que es una promesa
            // https://mongoosejs.com/docs/documents.html

            await curso.save();

            return res.status(201).json({
                ok: true,
                content: curso,
                message: 'Se actualizo las imagenes del curso'
            });
        }

        return res.status(401).json({
            ok: false,
            content: null,
            message: 'Faltan campos'
        });

    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al subir el archivo'
        });
    }
}




const eliminarImagenUsuario = async (req, res) => {
    // Al eliminar la imagen del usuario, me mandara solamente su id y tendremos que buscar en la BD el nombre de la imagen
    try {
        let { id } = req.params;
        let usuarioEncontrado = await Usuario.findById(id);
        let url = usuarioEncontrado.usuario_imagen.imagen_url;
        eliminarArchivoFirebase(url);

        usuarioEncontrado.usuario_imagen.imagen_url = "";

        await usuarioEncontrado.save();

        return res.json({
            ok: true,
            content: usuarioEncontrado,
            message: 'Imagen eliminada correctamente'
        });
    } catch (error) {
        console.log("Error eliminar imagen", error);
        return res.json({
            ok: false,
            content: error,
            message: 'Error al eliminar la imagen'
        });
    }

}


const eliminarImagenCurso = async (req, res) => {
    // el id del curso y la posicion de la imagen
    // localhost:5000/eliminarImagenCurso/:id/:posicion

    let { id, posicion } = req.params;
    let cursoEncontrado = await Curso.findById(id);
    let imagen = cursoEncontrado.curso_imagenes[posicion];

    let resultadoFirebase = await eliminarArchivoFirebase(imagen.imagen_url);

    cursoEncontrado.curso_imagenes.splice(posicion, 1);
    await cursoEncontrado.save();

    if (resultadoFirebase) {
        return res.json({
            ok: true,
            content: null,
            message: 'Imagen eliminada exitosamente'
        });
    }

    return res.json({
        ok: true,
        content: null,
        message: 'Imagen eliminada exitosamente de la BD, pero nose encontro en el storage'
    });
}



module.exports = {
    subirImagen,
    eliminarImagenUsuario,
    eliminarImagenCurso
}