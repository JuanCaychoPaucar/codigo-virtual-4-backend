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
            'respuesta': supermercados
        }
    elif request.method == 'POST':
        return "Me hiciste un POST"
    return "Se registró el supermercado"


if __name__ == '__main__':
    app.run(debug=True, port=5002)
