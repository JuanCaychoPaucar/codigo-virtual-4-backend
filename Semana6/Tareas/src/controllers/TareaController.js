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


const eliminarTareaPorId = (req, res) => {
    let { id_tarea } = req.params;
    if (tareas.length >= id_tarea) {
        // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice
        tareas.splice(id_tarea - 1, 1);
        return res.json({
            ok: true,
            message: 'Se elimino la tarea exitosamente',
            content: null
        });
    } else {
        return res.status(404).json({
            ok: false,
            message: 'No existe la tarea',
            content: null
        })
    }
}

// podemos pasar varios parametros, sin declararlos en nuestro enrutador
const devolverTareaPorId = (req, res) => {
    console.log(req.query);
    // validar si en los parametros esta el parametro id, y si esta, buscarlo en el array.
    // si no esta el id, indicar que falta ese parametro con un estado 500, y si no existe esa posicion, indicar que no existe con un estado 404

    // http://localhost:5000/api/tarea/filter?id=1&parametro2=valor2&parametro3=valor3
    // { id: '1', parametro2: 'valor2', parametro3: 'valor3' } lo que nos llega en el query
    // lo recuperamos en req.query

    // destructuramos id
    let { id } = req.query;

    if (id) {
        // significa que si hay el parametro id

        // validamos si ingresan valores menores o iguales a 0
        if (id > tareas.length || id <= 0) {
            return res.status(404).json({
                ok: false,
                content: null,
                message: 'Posicion no encontrada'
            })
        } else {
            return res.status(200).json({
                ok: true,
                content: tareas[id - 1],
                message: null
            })
        }
    }
    else {
        return res.status(500).json({
            ok: false,
            content: null,
            message: 'Falta el parametro id'
        })
    }
}

/**
 * PARAMS: /api/:id/:nombre/:edad
 * si usamos params, estos se deben de definir en la ruta
 * 
 * QUERY: /api?id=valor1&nombre=valor2&edad=valor3
 * si usamos query, no es necesario definirlo en la ruta, ya que es dinamico
 */

module.exports = {
    // crearTarea: crearTarea,
    crearTarea,
    listarTareas,
    editarTareaPorId,
    eliminarTareaPorId,
    devolverTareaPorId,
}