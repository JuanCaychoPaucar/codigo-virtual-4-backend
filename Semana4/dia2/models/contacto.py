from bd import bd

class ContactoModel(bd.Model):
    __tablename__ = 't_contacto'
    contact_id = bd.Column(bd.Integer, primary_key=True)
    contact_nomb = bd.Column(bd.String(45))
    contact_email = bd.Column(bd.String(25))
    contact_mensaje = bd.Column(bd.Text)
    usu_id = bd.Column(bd.Integer, bd.ForeignKey('t_usuario.usu_id'))

    def __init__(self, nombre, correo, mensaje, id_usuario):
        self.contact_nomb = nombre
        self.contact_email = correo
        self.contact_mensaje = mensaje
        self.usu_id = id_usuario

    def save(self):
        bd.session.add(self)
        bd.session.commit()