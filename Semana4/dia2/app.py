from flask import Flask, render_template, request, send_file
from bd import bd
from models.usuario import UsuarioModel
from models.contacto import ContactoModel
from models.proyecto import ProyectoModel
from models.redsocial import RedSocialModel
import os
from werkzeug.utils import secure_filename
from datetime import datetime

FOLDER_MULTIMEDIA = 'media'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@localhost/portafolioflask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = FOLDER_MULTIMEDIA

# para pasar variables de mi funcion a mi HTML, uso en mi html {{variable}}
# para usar statements, como por ejemplo un for, un bloque u otros, se usa:
# {% template_tag %} ...
# {% fin_template_tag %}


@app.before_first_request
def creacion_tablas():
    bd.init_app(app)
    bd.create_all(app=app)


@app.route('/')
def pagina_principal():
    usuario = UsuarioModel.query.first()
    arreglo = usuario.usu_titulos.split(",")
    print(usuario.usu_nom)
    return render_template('index.html', usuario=usuario, arreglo=arreglo)


@app.route('/proyectos')
def proyectos():
    mis_proyectos = ['Proyecto1', 'Proyecto2', 'Proyecto3', 'Proyecto4']
    return render_template('proyectos.html', proyectos=mis_proyectos)


@app.route('/contact')
def contactame():
    return render_template('contact-me.html')


@app.route('/subirArchivo', methods=['POST'])
def subir_archivo():
    print(request.files)
    if 'imagen' not in request.files:
        return 'No has enviado ningun archivo'

    archivo = request.files['imagen']

    if archivo.filename == '':
        return 'No hay ningun archivo en la llave imagen'

    # para evitar que el mismo usuario u otro usuario ingrese otro archivo, pero con un mismo nombre que ya esta en el servidor,
    # se agrega la fecha actual
    print(datetime.now().timestamp())
    fecha = str(datetime.now().timestamp()).replace(".", "")
    print(fecha)
    nombreModificado = fecha + '-' + archivo.filename
    filename = secure_filename(nombreModificado)
    print(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    archivo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    # que faltaria para agregar esa direccion de la imagen a mi proyecto
    return 'se guardó'

@app.route('/devolverImagen/<string:nombre>')
def devolver_imagen(nombre):
    try:
        return send_file(os.path.join(app.config['UPLOAD_FOLDER'], nombre))
    except:
        return send_file(os.path.join(app.config['UPLOAD_FOLDER'], 'default.png'))


if __name__ == '__main__':
    app.run(debug = True)
