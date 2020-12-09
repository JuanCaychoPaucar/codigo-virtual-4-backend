from bd import bd

class RedSocialModel(bd.Model):
    __tablename__ = 't_redsocial'
    rs_id = bd.Column(bd.Integer, primary_key=True)
    rs_nomb = bd.Column(bd.String(25))
    rs_link = bd.Column(bd.Text)
    usu_id = bd.Column(bd.Integer, bd.ForeignKey('t_usuario.usu_id'))
