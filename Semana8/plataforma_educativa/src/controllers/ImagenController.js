// https://www.npmjs.com/package/multer
// npm i multer

const { subirArchivo } = require('../utils/manejoArchivoFirebase');

const subirImagen = async (req, res) => {
    // si usamos el multer con varios archivos, debemos usar req.files
    // si es solo un archivo, usamos req.file
    try {
        console.log(req.file);

        let resultado = await subirArchivo(req.file);
        return res.status(201).json({
            ok: true,
            content: resultado,
            message: null
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al subir el archivo'
        });
    }
}



module.exports = {
    subirImagen
}