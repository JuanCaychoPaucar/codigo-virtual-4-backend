from bd import bd

class UsuarioModel(bd.Model):
    __tablename__='t_usuario'
    usu_id = bd.Column(bd.Integer, primary_key=True)
    usu_nom = bd.Column(bd.String(45))
    usu_ape = bd.Column(bd.String(45))
    usu_titulos = bd.Column(bd.Text)

    # relationship => no crean relaciones en la BD, pero sirven para devolver las relaciones de una manera mas facil, 
    # sin la necesidad de usar filtros y tambien las relaciones inversas
    contactos = bd.relationship('ContactoModel', backref='usuarioContacto')
    redes_sociales = bd.relationship('RedSocialModel', backref='usuarioRedSocial')
    proyectos = bd.relationship('ProyectoModel', backref='usuarioProyecto')

    def __init__(self, nombre, apellido, titulos):
        self.usu_nom = nombre
        self.usu_ape = apellido
        self.usu_titulos = titulos

    def save(self):
        bd.session.add(self)
        bd.session.commit()