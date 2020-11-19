# def __init__ es un constructor

# class Persona:
#     def __init__(self, nombre, fecnac):
#         self.nombre = nombre
#         self.fecha_nacimiento = fecnac
#     def saludar(self):
#         print(f"hola {self.nombre}")

#     def fechaNacimiento(self):
#         print(f"tu fecha de nacimiento es {self.fecha_nacimiento}")

# persona1 = Persona("Eduardo", "01 de agosto de 1942")
# persona1.saludar()
# persona1.fechaNacimiento()


# Crear una clase persona que tenga de atributos sus datos personales (nombre,apellido,edad) y su experiencia laboral.
# Que se ingrese por un menu la opc 1 para ingresar nueva experiencia laboral
# La opc 2 la muestre
# La opc 3 la elimine todas las experiencias
# La opcion 4 salga del programa


class Persona():
    nombre = "Juan"
    apellido = "Caycho"
    edad = 37
    experiencia_laboral = ["Tecnico de maquinas tragamonedas"]


flag = True

persona1 = Persona()

while(flag):
    try:
        print("MENU")
        print("[1] : Ingresar nueva experiencia laboral")
        print("[2] : Mostrar experiencia laboral")
        print("[3] : Eliminar experiencia laboral")
        print("[4] : Salir del programa")
        opcion = int(input("Seleccione opcion : "))

        if(opcion == 1):
            data = input("Ingrese nueva experiencia laboral : ")
            persona1.experiencia_laboral.append(data)
        elif(opcion == 2):
            print(persona1.experiencia_laboral)
        elif(opcion == 3):
            persona1.experiencia_laboral.clear()
        elif(opcion == 4):
            print("Adios")
            flag = False
    except:
        print("Ingresa solo numeros !!!!")
