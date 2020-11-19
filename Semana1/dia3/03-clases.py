# self, para devolver atributos y metodos de la clase. Es implicito

class Mueble():
    tipo = "Futon"
    valor = 00.00
    color = "Transparente"
    especificaciones = ["Hecho en Perú", "Caoba"]

    def devolver_especs(self):
        return self.especificaciones

# Crear un objeto o hacer una instancia de la clase Mueble
mueble1 = Mueble()
mueble2 = Mueble()

mueble1.tipo = "Dos cuerpos"

print(mueble1.tipo)
print(mueble2.tipo)
print(mueble2.devolver_especs())