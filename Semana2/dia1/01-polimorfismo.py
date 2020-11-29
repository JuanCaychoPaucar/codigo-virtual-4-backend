class Vehiculo:
    def __init__(self, peso):
        self.peso = peso
        print("Me muevo en muchas ruedas")

class Automovil(Vehiculo):
    def movilidad(self):
        print("Me muevo en 4 ruedas")


class Bicicleta(Vehiculo):
    def movilidad(self):
        print("Me muevo en 2 ruedas")


class Patines(Vehiculo):
    def movilidad(self):
        print("Me muevo en 6 ruedas")


miAuto = Automovil(14)
miAuto.movilidad()
miBici = Bicicleta(15)
miBici.movilidad()
