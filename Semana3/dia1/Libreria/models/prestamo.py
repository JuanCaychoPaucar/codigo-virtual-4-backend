from base_de_datos import bd

class PrestamoModel(bd.Model):
    __tablename__ = "t_prestamo"
    id_prestamo = bd.Column('prestamo_id', bd.Integer, primary_key=True, autoincrement=True)
    fechin_prestamo = bd.Column('prestamo_fechin', bd.Date(), nullable=False)
    fechfin_prestamo = bd.Column('prestamo_fechfin', bd.Date(), nullable=True)
    estado = bd.Column(bd.Boolean, default=True, nullable=False)

    #RELACIONES
    cliente = bd.Column('cli_id', bd.Integer, bd.ForeignKey('t_cliente.cli_id'), nullable=False)
    libro = bd.Column('lib_id', bd.Integer, bd.ForeignKey('t_libro.lib_id'), nullable=False)

    # constructor
    def __init__(self, fecha_inicio, fecha_fin, cliente, libro):
        self.fechin_prestamo = fecha_inicio
        self.fechfin_prestamo = fecha_fin
        self.cliente = cliente
        self.libro = libro

    def save(self):
        bd.session.add(self)
        bd.session.commit()
    
    def devolverJson(self):
        return {
            'id': self.id_prestamo,
            'fecha_inicio': str(self.fechin_prestamo),
            'fecha_fin': str(self.fechfin_prestamo),
            'cliente': self.clientePrestamo.devolverJson(),
            'libro': self.libroPrestamo.devolverJson()
        }

    def devolverJsonPorClienteId(self):
        return {
            'id': self.id_prestamo,
            'fecha_inicio': str(self.fechin_prestamo),
            'fecha_fin': str(self.fechfin_prestamo),
            'libro': self.libroPrestamo.devolverJson()
        }

    def devolverJsonPorLibroId(self):
        return {
            'id': self.id_prestamo,
            'fecha_inicio': str(self.fechin_prestamo),
            'fecha_fin': str(self.fechfin_prestamo),
            'cliente': self.clientePrestamo.devolverJson()
        }

    def update(self, **kwargs):
        fecha_inicio = kwargs.get('fecha_inicio') if kwargs.get('fecha_inicio') else self.fechin_prestamo # usando operador ternario
        fecha_fin = kwargs.get('fecha_fin') if kwargs.get('fecha_fin') else self.fechfin_prestamo
        cliente = kwargs.get('cliente') if kwargs.get('cliente') else self.cliente
        libro = kwargs.get('libro') if kwargs.get('libro') else self.libro
        estado = kwargs.get('estado') if kwargs.get('estado') else self.estado


        self.fechin_prestamo = fecha_inicio
        self.fechfin_prestamo = fecha_fin
        self.cliente = cliente
        self.libro = libro
        self.estado = estado

        self.save()

