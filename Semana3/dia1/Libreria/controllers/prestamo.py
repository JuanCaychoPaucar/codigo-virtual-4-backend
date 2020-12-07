from flask_restful import Resource, reqparse
from models.prestamo import PrestamoModel
from models.cliente import ClienteModel
from controllers.cliente import ClientePrestamoController
from controllers.libro import LibroController, LibroPrestamoController
import datetime

class PrestamosController(Resource):
    def get(self):
        resultado = PrestamoModel.query.all()
        respuesta = []
        for prestamo in resultado:
            respuesta.append(prestamo.devolverJson())
            # print(prestamo.clientePrestamo.devolverJson())
        return {
            'ok': True,
            'content': respuesta,
            'message': None
        }
    
    def post(self):
        parseador = reqparse.RequestParser()

        parseador.add_argument(
            'fecha_inicio',
            type=str,
            required=False,
            location='json',
            help='Falta el campo fecha inicio'
        )
        parseador.add_argument(
            'fecha_fin',
            type=str,
            required=False,
            location='json',
            help='Falta el campo fecha fin'
        )
        parseador.add_argument(
            'cliente',
            type=int,
            required=True,
            location='json',
            help='Falta el campo cliente'
        )
        parseador.add_argument(
            'libro',
            type=int,
            required=True,
            location='json',
            help='Falta el campo libro'
        )

        resultado = parseador.parse_args()
        today = datetime.date.today()
        resultado['fecha_inicio'] = today

        # al momento de ingresar un nuevo prestamo:
        # 1) que verifique que el usuario no tenga algun libro pendiente de devolucion
        # 2) vea si existen ejemplares de ese libro a prestar (o sea que los prestamos actuales de ese libro no superen a la cantidad del mismo)
        # 3) Al momento de realizar el prestamo, el libro y el cliente esten habilitados
        
        busquedaCliente = ClientePrestamoController()
        res_busqueda = busquedaCliente.get(resultado['cliente'])
        
        # print("CLIENTE ESTADO")
        # print(res_busqueda['content']['estado'])

        # verificar que el cliente exista
        if busquedaCliente:
            # verificar estado del cliente
            if res_busqueda['content']['estado'] == True:
                # verificar que el cliente no tenga libros pendientes por devolver
                pendiente = ""
                for fechafin in res_busqueda['content']['prestamos']:
                    if fechafin['fecha_fin'] == "None":
                        pendiente = fechafin['libro']
                # sino tuviera libros pendientes por devolver
                if pendiente == "":
                    # verificar estado del libro
                    busquedaLibro = LibroController()
                    res = busquedaLibro.get(resultado['libro'])
                    # si el estado del libro es habilitado
                    if res['content']['estado'] == True:
                        # verificar cantidad disponible del libro
                        libroPendienteEntrega = LibroPrestamoController()
                        res_libroPendienteEntrega = libroPendienteEntrega.get(resultado['libro'])
                        cantidadLibros = res_libroPendienteEntrega['content']['cantidad']
                        arregloPrestamos = res_libroPendienteEntrega['content']['prestamos']
                        cantidadPorDevolver = 0

                        for lib in arregloPrestamos:
                            if lib['fecha_fin'] == 'None':
                                cantidadPorDevolver += 1

                        if cantidadPorDevolver < cantidadLibros:
                            # se realiza el prestamo del libro
                            nuevoPrestamo = PrestamoModel(
                                resultado['fecha_inicio'],
                                resultado['fecha_fin'],
                                resultado['cliente'],
                                resultado['libro']
                            )
                            nuevoPrestamo.save()

                            return{
                                'ok': True,
                                'message': 'Prestamo creado con exito',
                                'content': "hola"
                            }, 201

                        else:
                            # no hay libros disponibles para prestamo
                            return{
                                'ok': False,
                                'message': 'No se dispone de libros para prestamo',
                                'content': None
                            }
                        
                    # libro con estado deshabilitado
                    else:
                        return{
                            'ok': False,
                            'message': 'Libro deshabilitado',
                            'content': None
                        }

                # tiene libro pendiente por devolver
                else:
                    return{
                        'ok': False,
                        'message': 'Cliente tiene un libro pendiente por devolver',
                        'content': pendiente
                    }
            
            # estado deshabilitado
            else:
                return{
                    'ok': False,
                    'message': 'Cliente deshabilitado',
                    'content': None
                }
            
        # # cliente no existe
        else:
            return{
            'ok': False,
            'message': 'Cliente no existe',
            'content': None
            }

class PrestamoController(Resource):
    def put(self, id):
        resultado = PrestamoModel.query.filter_by(id_prestamo=id).first()

        if resultado:
            parseador = reqparse.RequestParser()

            parseador.add_argument(
                'fecha_inicio',
                type=str,
                required=False,
                location='json',
                help='Falta el campo fecha inicio'
            )
            parseador.add_argument(
                'fecha_fin',
                type=str,
                required=False,
                location='json',
                help='Falta el campo fecha fin'
            )
            parseador.add_argument(
                'cliente',
                type=int,
                required=False,
                location='json',
                help='Falta el campo cliente'
            )
            parseador.add_argument(
                'libro',
                type=int,
                required=False,
                location='json',
                help='Falta el campo libro'
            )
            parseador.add_argument(
                'estado',
                type=bool,
                required=False,
                location='json',
                help='Falta el campo libro'
            )

            body = parseador.parse_args()
            resultado.update(
                fecha_inicio=body['fecha_inicio'],
                fecha_fin=body['fecha_fin'],
                cliente=body['cliente'],
                libro=body['libro'],
                estado=body['estado']
            )
            return {
                'ok': True,
                'content': resultado.devolverJson(),
                'message': 'Prestamo actualizado con exito'
            }, 201
