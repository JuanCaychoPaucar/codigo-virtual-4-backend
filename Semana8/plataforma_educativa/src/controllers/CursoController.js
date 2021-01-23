const { Curso } = require('../config/Mongoose');

const crearCurso = async (req, res) => {
    try {
        let objCurso = new Curso(req.body);

        // aqui ira la logica de agregar imagen
        let nuevoCurso = await objCurso.save();

        return res.status(201).json({
            ok: true,
            content: nuevoCurso,
            message: 'Curso creado exitosamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Error al crear el curso'
        });
    }
}

module.exports = {
    crearCurso,
}