from base_de_datos import bd


class ClienteModel(bd.Model):
    __tablename__ = "t_cliente"
    id_cliente = bd.Column('cli_id', bd.Integer,
                           primary_key=True, autoincrement=True)
    dni_cliente = bd.Column('cli_dni', bd.String(8), nullable=False)
    nombre_cliente = bd.Column('cli_nomb', bd.String(45), nullable=False)
    apellido_cliente = bd.Column('cli_ape', bd.String(45), nullable=False)
    estado = bd.Column(bd.Boolean, default=True, nullable=False)

    prestamosCliente = bd.relationship(
        'PrestamoModel', backref='clientePrestamo')

    def __init__(self, dni, nombre, apellido):
        self.dni_cliente = dni
        self.nombre_cliente = nombre
        self.apellido_cliente = apellido

    def save(self):
        bd.session.add(self)
        bd.session.commit()

    def __str__(self):
        return self.nombre_cliente

    def devolverJson(self):
        return {
            'id': self.id_cliente,
            'dni': str(self.dni_cliente),
            'nombre': self.nombre_cliente,
            'apellido': self.apellido_cliente,
            'estado': self.estado
        }
    
    def devolverClientePrestamo(self):
        resultado = self.devolverJson()
        print(self.prestamosCliente)
        prestamos = []
        for prestamo in self.prestamosCliente:
            prestamos.append(prestamo.devolverJson())
        # agregamos una nueva llave llamada prestamos
        resultado['prestamos'] = prestamos
        return resultado

    def devolverPrestamosClientePorId(self):
        resultado = self.devolverJson()
        prestamos = []
        for prestamo in self.prestamosCliente:
            prestamos.append(prestamo.devolverJsonPorClienteId())
        resultado['prestamos'] = prestamos
        return resultado


    def update(self, **kwargs):
        dni = kwargs.get('dni') if kwargs.get('dni') else self.dni_cliente
        nombre = kwargs.get('nombre') if kwargs.get('nombre') else self.nombre_cliente
        apellido = kwargs.get('apellido') if kwargs.get('apellido') else self.apellido_cliente
        estado = kwargs.get('estado') if kwargs.get('estado') else self.estado
        self.dni_cliente = dni
        self.nombre_cliente = nombre
        self.apellido_cliente = apellido
        self.estado = estado
        self.save()

    def inhabilitarCliente(self):
        self.estado = False
        self.save()
