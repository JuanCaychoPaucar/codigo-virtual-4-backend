from flask import Flask, request

app = Flask(__name__)
supermercados = []


@app.route('/')
def inicio():
    print("hola")
    return "El servidor se ha levantado exitosamente"

# por defecto el unico metodo (verbo) permitido, sino le indicamos, va a ser el GET


@app.route('/supermercado', methods=['GET', 'POST'])
def ingresar_supermercado():
    print(request.method)
    if request.method == 'GET':
        return {
            'ok': True,
            'content': supermercados,
            'message': None,
        }
    elif request.method == 'POST':
        # metodo get_json() convierte lo que me llega por el body, a un diccionario en Python
        print(request.get_json())
        informacion = request.get_json()
        supermercados.append(informacion)

        # le colocamos un codigo de estado, en este caso el 201 (CREATED)
        # NOTA: Sino pasamos ningun estado, por defecto es el 200
        # https://developer.mozilla.org/es/docs/Web/HTTP/Status
        return {
            'ok': True,
            'content': supermercados,
            'message': "Se agregó exitosamente el supermercado",
        }, 201
    return "Se registró el supermercado"


@app.route('/supermercado/<int:id_super>', methods=['GET', 'PUT', 'DELETE'])
def supermercadoPorId(id_super):
    if len(supermercados) > id_super:
        # como verifico que el id que me mande exista en mi lista
        if request.method == 'GET':
            return {
                'ok': True,
                'content': supermercados[id_super],
                'message': None,
            }
        elif request.method == 'PUT':
            data = request.get_json()
            supermercados[id_super] = data
            return {
                'ok': True,
                'content': supermercados[id_super],
                'message': 'Se actualizó el supermercado exitosamente',
            }, 201
        elif request.method == 'DELETE':
            # pop me permite guardar el objeto eliminado, si lo requerimos
            supermercados.pop(id_super)
            return {
                'ok': True,
                'content': None,
                'message': 'Registro eliminado',
            }, 204

    else:
        return{
            'ok': False,
            'content': None,
            'message': 'El supermercado con posicion {} no existe'.format(id_super),
        }

    return {'id': id_super}


if __name__ == '__main__':
    app.run(debug=True, port=5002)
