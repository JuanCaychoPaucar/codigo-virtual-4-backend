# este archivo es el que vamos a desplegar en heroku
from flask import Flask
from base_de_datos import bd
from flask_restful import Api
# from models.libro import LibroModel
from controllers.libro import LibrosController, LibroController, LibroPrestamoController
from controllers.cliente import ClientesController, ClienteController, ClientePrestamoController
from controllers.prestamo import PrestamosController, PrestamoController
# from models.cliente import ClienteModel
# from models.prestamo import PrestamoModel

# instanciamos para poder levantar mi servidor de backend
app = Flask(__name__)

# Creo una instancia de mi clase Api, en la cual tengo que pasar la app para que pueda registrar psoteriormente todas mis rutas con sus respectivos controladores,
# sino hago eso, todos los controladores registrados no se podran usar
api = Api(app=app)

# https://flask-sqlalchemy.palletsprojects.com/en/2.x/config/#connection-uri-format
# 'tipobd://usuario:password@servidor/nomb-bd'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@localhost/libreriavirtual'
# sirve para evitar el warning de que la funcionalidad del sqlalchemy de track modification en un futuro estara deprecada
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# print(app.config)


@app.before_first_request
def creacion_bd():
    # inicio la aplicacion pasandole la instancia app, que internamente va a buscar la llave SQLALCHEMY_DATABASE_URI
    # y si la encuentra, va a conectar con la base de datos
    bd.init_app(app)

    # va a realizar la creacion de todos los modelos definidos anteriormente
    bd.create_all(app=app)

    # va a realizar la eliminacion de todos los modelos en mi base de datos
    # bd.drop_all(app=app)


@app.route('/')
def inicio():
    return 'La API funciona correctamente'


# definiendo las rutas de mi aplicacion
# en el add_resource van 2 o mas parametros, obligatoriamente en el primero va el Recurso(comportamiento),
# y en el segundo o mas van las rutas de acceso
api.add_resource(LibrosController, '/libro')
api.add_resource(LibroController, '/libro/<int:id>')
api.add_resource(LibroPrestamoController, '/libro/<int:id>/prestamo')
api.add_resource(ClientesController, '/cliente')
api.add_resource(ClienteController, '/cliente/<int:id>')
api.add_resource(ClientePrestamoController, '/cliente/<int:id>/prestamo')
api.add_resource(PrestamosController, '/prestamo')
api.add_resource(PrestamoController, '/prestamo/<int:id>')

if __name__ == '__main__':
    app.run(debug=True, port=5002)
