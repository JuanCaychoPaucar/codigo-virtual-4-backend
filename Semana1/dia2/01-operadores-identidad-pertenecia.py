# Operadores Identidad
# is => es
# is not => no es
# sirve para ver sis estan apuntando a la misma direccion de memoria

frutas = ['MANZANA', 'PERA', 'FRESA']
frutas2 = frutas
print(frutas is frutas2)

# Operador pertenencia
# in => me indicara si esta incluido o no en cierta coleccion de datos
# not in => 
alumnos = ['JOSE', 'RAUL', 'CINTIA', 'GONZALO']
nombre = "RAUL"
print(nombre in alumnos)

nombre = "EDUARDO"
print(nombre not in alumnos)
