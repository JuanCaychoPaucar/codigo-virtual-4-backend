# setter = ingresar el valor a un atributo
# getter = devolver el valor del atributo
# deletter = elimina el atributo de una clase

class Persona():
    def __init__(self):
        self.__nombre = ""

    def __setNombre(self, nombre):
        print("El setNombre ha sido llamado")
        self.__nombre = nombre

    def __getNombre(self):
        print("El getNombre ha sido llamado")
        return self.__nombre

    def __deleteNombre(self):
        print("El deleteNombre ha sido llamado")
        del self.__nombre

    # funcion property para definir nuestras funciones de get, set, delete
    name = property(__getNombre, __setNombre, __deleteNombre)


objPersona = Persona()
objPersona.name = "Eduardo"
print(objPersona.name)
del objPersona.name
