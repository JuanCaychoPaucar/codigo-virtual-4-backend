# pip install flask
# pip list

from flask import Flask

# __name__ sirve para definir que nuestra aplicacion de flask se va a ejecutar en el hilo principal del compilador de python
app = Flask(__name__)

# siempre para indicar el comprtamiento de una ruta, tiene que ir en un decorador y luego definir su funcion con todo su comportamiento adentro
@app.route('/')
def inicio():
    print("hola")
    return "El servidor se ha levantado exitosamente"

# debug=True => para que cuando nosotros hagamos algun cambio en nuestra aplicacion, al momneto de guardarse se reinicie el servidor
# app.run() siempre debe ser la ultima linea de codigo
# la condicional __name__ == '__main__' sirve muy parecido al void main(){}, es decir, sirve para usar la parte principal del compilador
if __name__ == '__main__':
    app.run(debug=True, port=5002)
