# cuando un atributo o metodo tiene doble guion al comienzo, significa que es privado,
# por ende, no puede accederse si no es dentro de la misma clase

class Vehiculo():
    def __init__(self, largo, ancho, peso):
        self.largo = largo
        self.ancho = ancho
        self.peso = peso
        self.__enMarcha = False
    def modifica_marcha(self):
        self.__enMarcha = True
    def __modificarLargo(self):
        self.largo = 0

objVehiculo = Vehiculo(15.00, 2.00, 1560)
objVehiculo.modifica_marcha()
objVehiculo.largo
