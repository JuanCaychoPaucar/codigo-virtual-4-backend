# pip install flask-restful
# reqparse => para indicar las caracterisiticas que deben de cumplirse para poder continuar con la logica de la api

from flask import Flask, request
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)

items = [
    {
        'prodNom': 'Sapolio',
        'prodPrec': 5.40,
        'prodCar': ['LIMPIA TODO', 'DESENGRASANTE', 'LAVAVAJILLAS']
    },
    {
        'prodNom': 'Ayudin',
        'prodPrec': 3.8,
        'prodCar': ['ESPONJA GRATIS', 'LIQUIDO', 'DESENGRASANTE', 'PULIDOR']
    },
    {
        'prodNom': 'Pepsi 3L',
        'prodPrec': 5.8,
        'prodCar': ['GASEOSA', 'CARBONATADA', 'LIQUIDO', 'ALTO EN AZUCAR']
    }
]

# tener un CRUD y que ademas, de acuerdo a un buscador, que me indique todos los productos que tengan esa caracteristica
# 127.0.0.1/buscar {"palabra": "DESENGRASANTE"}


@app.route('/')
def inicio():
    return 'La api funciona'

#palabra, es lo que le pasamos por el POST
@app.route('/buscar', methods=['POST'])
def buscar():
    data = request.get_json()
    palabra = data['palabra'].lower()
    # print(palabra)
    resultado = []
    for item in items:
        # print(item['prodCar'])
        for caracteristica in item['prodCar']:
            if caracteristica.lower() == palabra:
                resultado.append(item)
    # print(caracteristica)
    return {
        'ok': True,
        'content': resultado
    }


# Clase Item que hereda de la clase Resource
class Item(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        'prodNom',
        type=str,
        required=True,
        help='Falta el nombre del producto'
    )

    parser.add_argument(
        'prodPrec',
        type=float,
        required=True,
        help='Falta el precio del producto'
    )

    parser.add_argument(
        'prodCar',
        type=list,
        required=False,
        location='json',
        help='Falta las caracteristicas del producto'
    )

    # METODOS
    def get(self, id):
        if len(items) > id:
            return {
                'ok': True,
                'content': None,
                'message': items[id],
            }
        else:
            return {
                'ok': False,
                'content': 'No se encontro el item a buscar',
                'message': None,
            }

    def post(self):
        # realiza la validacion que configuramos previamente. Si todo esta correcto, lo asigna a la variable data
        data = self.parser.parse_args()
        items.append(data)
        return {
            'ok': True,
            'content': data,
            'message': 'Se agrego exitosamente el item',
        }

    def put(self, id):
        if len(items) > id:
            data = self.parser.parse_args()
            items[id] = data
            return {
                'ok': True,
                'content': data,
                'message': 'Se actualizo el item',
            }, 201
        else:
            return {
                'ok': False,
                'content': None,
                'message': 'No se encontro el item a actualizar',
            }

    def delete(self, id):
        if len(items) > id:
            items.pop(id)
            return {
                'ok': True,
                'content': None,
                'message': 'Se elimino el item',
            }
        else:
            return {
                'ok': False,
                'content': None,
                'message': 'No se encontro el item a actualizar',
            }


# Con el uso de flask_restfull ya no se necesitan decoradores.
# Solamente se pasas un parametro para agregar un recurso a la api.
# Le pasamos la clase, en este caso Item

api.add_resource(Item, '/item', '/item/<int:id>')

# ejecutamos el programa
if __name__ == '__main__':
    app.run(debug=True, port=5002)
