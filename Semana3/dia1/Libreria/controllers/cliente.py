from flask_restful import Resource, reqparse
from models.cliente import ClienteModel


class ClientesController(Resource):
    def get(self):
        resultado = ClienteModel.query.all()
        respuesta = []
        for cliente in resultado:
            respuesta.append(cliente.devolverJson())
            print(cliente.devolverJson())
        return{
            'ok': True,
            'content': respuesta,
            'message': None
        }

    def post(self):
        parseador = reqparse.RequestParser()

        parseador.add_argument(
            'dni',
            type=str,
            required=True,
            location='json',
            help='Falta el campo dni'
        )

        parseador.add_argument(
            'nombre',
            type=str,
            required=True,
            location='json',
            help='Falta el campo nombre'
        )

        parseador.add_argument(
            'apellido',
            type=str,
            required=True,
            location='json',
            help='Falta el campo apellido'
        )

        resultado = parseador.parse_args()

        nuevoCliente = ClienteModel(
            resultado['dni'],
            resultado['nombre'],
            resultado['apellido']
        )

        nuevoCliente.save()

        return{
            'ok': True,
            'message': 'Nuevo cliente creado con exito',
            'content': nuevoCliente.devolverJson()
        }, 201


class ClienteController(Resource):
    def get(self, id):
        resultado = ClienteModel.query.filter_by(id_cliente=id).first()

        if resultado:
            return {
                'ok': True,
                'content': resultado.devolverJson(),
                'message': None
            }
        else:
            return {
                'ok': False,
                'content': None,
                'message': 'No existe ese cliente'
            }, 404

    def put(self, id):
        resultado = ClienteModel.query.filter_by(id_cliente=id).first()

        if resultado:
            parseador = reqparse.RequestParser()

            parseador.add_argument(
                'dni',
                type=str,
                required=False,
                location='json',
                help='Falta el DNI'
            )
            parseador.add_argument(
                'nombre',
                type=str,
                required=False,
                location='json',
                help='Falta el campo nombre '
            )
            parseador.add_argument(
                'apellido',
                type=str,
                required=False,
                location='json',
                help='Falta el campo apellido '
            )
            parseador.add_argument(
                'estado',
                type=bool,
                required=False,
                location='json',
                help='Falta el campo estado '
            )

            body = parseador.parse_args()
            resultado.update(
                dni=body['dni'],
                nombre=body['nombre'],
                apellido=body['apellido'],
                estado=body['estado']
            )
            return {
                'ok': True,
                'content': resultado.devolverJson(),
                'message': 'Cliente actualizado con exito'
            }, 201

        else:
            return {
                'ok': False,
                'content': None,
                'message': 'No existe ese cliente'
            }, 404

    def delete(self, id):
        resultado = ClienteModel.query.filter_by(id_cliente=id).first()

        if resultado:
            resultado.inhabilitarCliente()
            return {
                'ok': True,
                'content': None,
                'message': 'Se eliminó exitosamente el cliente'
            }
        else:
            return {
                'ok': False,
                'content': None,
                'message': 'No existe ese cliente'
            }, 404

class ClientePrestamoController(Resource):
    def get(self, id):
        resultado = ClienteModel.query.filter_by(id_cliente=id).first()
        return{
            'ok': True,
            'content': resultado.devolverPrestamosClientePorId(),
            'message': None
        }