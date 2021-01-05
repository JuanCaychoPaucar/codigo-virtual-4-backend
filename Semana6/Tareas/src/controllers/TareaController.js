// Aqui se va a definir todos los controladores (comportamiento que va a recibir cuando se llama a una ruta determinada con su metodo de acceso (get, post, delete, put))

let tareas = [
    {
        nombre: "Ir al gym",
        importancia: "baja"
    }
];

const crearTarea = (req, res) => {
    console.log(req.body);
    let tarea = req.body;
    // la forma de capturar lo que me manda el usuario mediante el body,es por su request (req)
    tareas.push(tarea);
    console.log(tareas);
    return res.json({
        ok: true,
        content: tareas,
        message: 'Se agregó la tarea exitosamente'
    })
}

const listarTareas = (req, res) => {
    return res.json({
        ok: true,
        content: tareas,
        message: null
    })
}


const editarTareaPorId = (req, res) => {
    // para capturar un valor pasado por la URl, se usa su metodo params, que nos retorna un diccionario de todas las variables declarada en la ruta
    let { id_tarea } = req.params;

    // validar que la posisicon mandada exista, si existe hace el cambio de la tarea, y sino, indicar que la tarea no existe

    if (tareas.length >= id_tarea) {
        // significa que la tarea existe
        tareas[id_tarea - 1] = req.body;
        return res.json({
            ok: true,
            content: tareas[id_tarea - 1],
            message: 'Si existe esa tarea'
        })
    }
    else {
        // el id esta fuera de la longitud de mis tareas
        return res.json({
            ok: false,
            content: null,
            message: 'No existe esa tarea'
        })
    }
}


const eliminarTareaPorId = (req, res)=>{
    let {id_tarea} = req.params;
    if (tareas.length >= id_tarea){
        // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice
        tareas.splice(id_tarea-1 , 1);
        return res.json({
            ok :true,
            message:'Se elimino la tarea exitosamente',
            content: null
        });
    }else{
        return res.status(404).json({
            ok: false,
            message: 'No existe la tarea',
            content: null
        })
    }
}

module.exports = {
    // crearTarea: crearTarea,
    crearTarea,
    listarTareas,
    editarTareaPorId,
    eliminarTareaPorId,
}