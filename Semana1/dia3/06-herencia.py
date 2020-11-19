class Persona():
    def __init__(self, nombre, apellido, nacionalidad):
        self.nombre = nombre
        self.apellido = apellido
        self.nacionalidad = nacionalidad

    def saludar(self):
        print(f"Hola {self.nombre} {self.apellido}")


class Alumno(Persona):
    def __init__(self, num_matricula, anio,  nombre, apellido, nacionalidad):
        self.matricula = num_matricula
        self.anio = anio
        super().__init__(nombre, apellido, nacionalidad)

    def mostrarAnio(self):
        print(f"Sua año es {self.anio}")


class Docente:
    pass


objPersona = Persona("Eduardo", "de Rivero", "peruano")
