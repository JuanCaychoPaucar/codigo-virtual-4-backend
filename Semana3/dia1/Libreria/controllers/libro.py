from flask_restful import Resource, reqparse
from models.libro import LibroModel

class LibrosController(Resource):
    def get(self):
        resultado = LibroModel.query.all()  # SELECT * FROM T_LIBRO
        respuesta = []
        for libro in resultado:
            respuesta.append(libro.devolverLibroPrestamo())
            print(libro.devolverJson())
        return{
            'ok': True,
            'content': respuesta,  # solo se puede retornar: string, diccionario o lista
            'message': None
        }

    def post(self):
        parseador = reqparse.RequestParser()
        # una vez declarada la instancia de la clase RequestParser, tengo que declarar que argumentos van a ser encargados de la validacion
        # y todo argumento que no lo declare y me lo pase el front, va a ser eliminado
        parseador.add_argument(
            'nombre',
            type=str,
            required=True,
            location='json',  # para que el usuario lo mande por el body y no por la URL
            help='Falta el campo nombre'
        )

        parseador.add_argument(
            'edicion',
            type=str,
            required=True,
            location='json',
            help='Falta la edicion'
        )

        parseador.add_argument(
            'autor',
            type=str,
            required=True,
            location='json',
            help='Falta el autor'
        )

        parseador.add_argument(
            'cantidad',
            type=int,
            required=True,
            location='json',
            help='Falta la cantidad'
        )

        # parse_Args me permite validar que todos los argumentos se esten pasando de manera correcta
        # si todo esta correcto, devuleve la informacion en formato de un diccionario
        resultado = parseador.parse_args()
        # creo una instancia de mi modelo
        nuevoLibro = LibroModel(
            resultado['nombre'], resultado['edicion'], resultado['cantidad'], resultado['autor'])
        # hago que todos los cambios sean almacenados en la base de datos
        nuevoLibro.save()
        # imprimos el id del libro creado
        # print(nuevoLibro.id_libro)
        return{
            'ok': True,
            'content': 'Nuevo libro creado con exito',
            'message': nuevoLibro.devolverJson()
        }, 201


class LibroController(Resource):
    def get(self, id):
        # Select * from t_libro where param=valor
        # al usar el metodo first(), va a devolver la primera coincidencia y ya no una lista, sino un objeto en concreto
        # LibroModel.query.filter_by(id_libro=id).first()
        # print(LibroModel.query.filter_by(id_libro=id).first())

        resultado = LibroModel.query.filter_by(id_libro=id).first()

        if resultado:
            # si hay libro
            return {
                'ok': True,
                'content': resultado.devolverJson(),
                'message': None
            }
        else:
            # no hay libro
            return {
                'ok': False,
                'content': None,
                'message': 'No existe ese libro'
            }, 404

    def put(self, id):
        resultado = LibroModel.query.filter_by(id_libro=id).first()

        if resultado:
            parseador = reqparse.RequestParser()

            parseador.add_argument(
                'nombre',
                type=str,
                required=False,
                location='json',  # para que el usuario lo mande por el body y no por la URL
                help='Falta el campo nombre'
            )

            parseador.add_argument(
                'edicion',
                type=str,
                required=False,
                location='json',
                help='Falta la edicion'
            )

            parseador.add_argument(
                'autor',
                type=str,
                required=False,
                location='json',
                help='Falta el autor'
            )

            parseador.add_argument(
                'cantidad',
                type=int,
                required=False,
                location='json',
                help='Falta la cantidad'
            )

            parseador.add_argument(
                'estado',
                type=bool,
                required=False,
                location='json'
            )

            body = parseador.parse_args()
            resultado.update(
                nombre=body['nombre'],
                edicion=body['edicion'],
                autor=body['autor'],
                cantidad=body['cantidad'],
                estado=body['estado'])
            return {
                'ok': True,
                'content': resultado.devolverJson(),
                'message': 'Libro actualizado con exito'
            }, 201

        else:
            return {
                'ok': False,
                'content': None,
                'message': 'No existe ese libro'
            }, 404

    # def delete(self, id):
    #     resultado = LibroModel.query.filter_by(id_libro=id).first()

    #     if resultado:
    #         resultado.delete()
    #         return {
    #             'ok': True,
    #             'content': None,
    #             'message': 'Se elimino exitosamente el libro'
    #         }
    #     else:
    #         return {
    #             'ok': False,
    #             'content': None,
    #             'message': 'No existe ese libro'
    #         }, 404

    def delete(self, id):
        resultado = LibroModel.query.filter_by(id_libro=id).first()
        # en vez de eliminar, lo vamos a inhabilitar
        if resultado:
            resultado.inhabilitarLibro()
            return {
                'ok': True,
                'content': None,
                'message': 'Se eliminó exitosamente el libro'
            }
        else:
            return {
                'ok': False,
                'content': None,
                'message': 'No existe ese libro'
            }, 404

class LibroPrestamoController(Resource):
    def get(self, id):
        resultado = LibroModel.query.filter_by(id_libro=id).first()
        return{
            'ok': True,
            'content': resultado.devolverPrestamosLibroPorId(),
            'message': None
        }