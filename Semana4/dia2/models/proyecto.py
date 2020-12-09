from bd import bd

class ProyectoModel(bd.Model):
    __tablename__ = 't_proyecto'
    proy_id = bd.Column(bd.Integer, primary_key=True)
    proy_desc = bd.Column(bd.String(45))
    proy_duracion = bd.Column(bd.String(5))
    proy_img = bd.Column(bd.Text)
    usu_id = bd.Column(bd.Integer, bd.ForeignKey('t_usuario.usu_id'))

    def __init__(self, descripcion, duracion, imagen, usuario):
        self.proy_desc = descripcion
        self.proy_duracion = duracion
        self.proy_img = imagen
        self.usu_id = usuario

    def save(self):
        bd.session.add(self)
        bd.session.commit()
