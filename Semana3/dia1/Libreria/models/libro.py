# crear un archivo __init__.py por cada modulo, para poder importar

from base_de_datos import bd


class LibroModel(bd.Model):
    __tablename__ = "t_libro"
    id_libro = bd.Column('lib_id', bd.Integer,
                         primary_key=True, autoincrement=True)
    nombre_libro = bd.Column('lib_nom', bd.String(45), nullable=False)
    edicion_libro = bd.Column('lib_edicion', bd.Date(), nullable=False)
    autor_libro = bd.Column('lib_autor', bd.Text(), nullable=False)
    cantidad_libro = bd.Column('lib_cant', bd.Integer, nullable=False)
    estado = bd.Column(bd.Boolean, default=True, nullable=False)

    # Sirve para hacer la relacion inversa
    # solo se crea en las tablas que se hace la relacion
    # backref sirve para uso interno de sqlalchemist
    prestamosLibro = bd.relationship('PrestamoModel', backref='libroPrestamo')

    def __init__(self, nombre, edicion, cantidad, autor):
        self.nombre_libro = nombre
        self.edicion_libro = edicion
        self.cantidad_libro = cantidad
        self.autor_libro = autor

    def save(self):
        # crea la instanciacion en la base de datos (ingresa todos los datos, pero aun no se guardan)
        bd.session.add(self)
        # hace que los cambios ingresados sean permanentes (aca ya se guarda en la base de datos)
        bd.session.commit()

    def __str__(self):
        # este metodo magico permite sobreescribir la forma en la cual se lee el objeto en consola
        return self.nombre_libro

    def devolverJson(self):
        return {
            'id': self.id_libro,
            'nombre': self.nombre_libro,
            'edicion': str(self.edicion_libro),
            'autor': self.autor_libro,
            'cantidad': self.cantidad_libro,
            'estado': self.estado
        }

    def devolverLibroPrestamo(self):
        resultado = self.devolverJson()
        print(self.prestamosLibro)
        prestamos = []
        for prestamo in self.prestamosLibro:
            prestamos.append(prestamo.devolverJson())
        # agregamos una nueva llave llamada prestamos
        resultado['prestamos'] = prestamos
        return resultado

    def devolverPrestamosLibroPorId(self):
        resultado = self.devolverJson()
        prestamos = []
        for prestamo in self.prestamosLibro:
            prestamos.append(prestamo.devolverJsonPorLibroId())
        resultado['prestamos'] = prestamos
        return resultado

    def update(self, **kwargs): #parametro=valor, parametro2=valor2
        # el metodo get se usa para los diccionarios y se encarga de que de auerdo a la llave que le pasemos (parametro 1)
        # va a devolver su valor, y opcionalmente como segundo parametro que le puede indicar que valor va a retornar, si es que la llave indicada no existe
        nombre = kwargs.get('nombre') if kwargs.get('nombre') else self.nombre_libro # usando operador ternario
        autor = kwargs.get('autor') if kwargs.get('autor') else self.autor_libro
        edicion = kwargs.get('edicion') if kwargs.get('edicion') else self.edicion_libro
        cantidad = kwargs.get('cantidad') if kwargs.get('cantidad') else self.cantidad_libro
        estado = kwargs.get('estado') if kwargs.get('estado') else self.estado
        self.nombre_libro = nombre
        self.autor_libro = autor
        self.edicion_libro = edicion
        self.cantidad_libro = cantidad
        self.estado = estado
        self.save()

    def delete(self, **kwargs):
        bd.session.delete(self)
        bd.session.commit()

    def inhabilitarLibro(self):
        self.estado = False
        self.save()
        # bd.session.commit()


    