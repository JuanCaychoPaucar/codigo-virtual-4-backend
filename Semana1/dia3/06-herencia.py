class Persona:
    def __init__(self, nombre, apellido, nacionalidad):
        self.nombre = nombre
        self.apellido = apellido
        self.nacionalidad = nacionalidad

    def saludar(self):
        print(f"Hola {self.nombre} {self.apellido}")


class Alumno(Persona):
    def __init__(self, num_matricula, anio, nombre, apellido, nacionalidad):
        self.matricula = num_matricula
        self.anio = anio
        super().__init__(nombre, apellido, nacionalidad)

    def mostrarAnio(self):
        print(f"Su año es {self.anio}")


class Docente(Persona):
    def __init__(self, seguro_soc, num_contrato, nombre, apellido, nacionalidad):
        self.seguro = seguro_soc
        self.contrato = num_contrato
        super().__init__(nombre, apellido, nacionalidad)

    def saludar_profe(self):
        # si existe unmetodoo atributo privado del padre,esose respeta, incluyendo la herencia.
        # Es decir, no podremosusarlo fuera de la misma clase donde esta ese atributo o metodo.
        # super().saludar()
        print(
            f"Tu numero de seguro social es {self.seguro} y tu contrato es {self.contrato}")


objPersona = Persona("Eduardo", "de Rivero", "peruano")
objDocente = Docente("201115", "1748", "Juan", "Martinez", "ecuatoriano")
objDocente.saludar_profe()

objAlumno = Alumno("252525", "2006", "Juan", "Rodriguez", "colombiano")
objPersona.saludar()
print(objAlumno.nacionalidad)
objAlumno.mostrarAnio()

# Se tiene 3 clases, Perro, Pastor_Aleman y Schnauzer, de la cual la diferencia entre un pastor aleman y un schanuzer es principalmente que
# uno tiene un sentido del olfato desarrollado, mientras que el otro tiene una velocidad promedio de 20km/h.
# Indicar como se desarrolaria la herencia, puesto que ambos comparten muchos atributos y metodos en comun


class Perro:
    def __init__(self, nombre, edad, tipo_pelaje):
        self.nombre = nombre
        self.edad = edad,
        self.pelaje = tipo_pelaje


class Pastor_Aleman(Perro):
    def __init__(self, olfato, nombre, edad, tipo_pelaje):
        self.olfato = olfato
        super().__init__(nombre, edad, tipo_pelaje)


class Schnauzer(Perro):
    def __init__(self, velocidad, nombre, edad, tipo_pelaje):
        self.velocidad = velocidad
        super().__init__(nombre, edad, tipo_pelaje)


objPerro = Perro("Firulais", 5, "Arto")
objSchnauzer = Schnauzer("alta","Morocha",8,"Poco")
print(objSchnauzer.edad)
