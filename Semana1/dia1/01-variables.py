# Para definir variables numericas
numero = 1
numeroDecimal = 18.5

# Variables de tipo texto
texto = 'Soy un texto'
otroTexto = "Soy otro texto"

# Para saber que tipo de variable es:
print(type(numeroDecimal))

# Para mostrar algo en la consola, utilizamos print()
print(1,2,3)

# Para definir una variable, tiene que comenzar con una letra. Nunca con un numero.

# Hay 2 clases de variables, Mutables e Inmutables
# MUTABLES => son las variables que se van a modificar y todas sus referencias van a sufir los cambios (List, dict, tuples)
# INMUTABLES => Son las que van a modificar solamente una determinada variable, sin que las otras que copiaron su valor tambien lo hagan (int, str, float, bool, etc)

# Para eliminar una variable
del texto
# print(texto)

# nameError: esa variable no existe
variable1 = 10
variable2 = 10.5
variable3 = True
variable4 = "Texto"

# Para definir varias variables en una sola linea de codigo
# nombre = Eduardo apellido = de Rivero
nombre, apellido = "Eduardo", "de Rivero"
edad, nacionalidad = (35, "Peruano")

# La variable con valor None, es una variable sin tipo y esta esperando cambiar de valor para tener un tipo definido
variablex = None

curso = "backend"
curso = 5

# variables Inmutables
a=10
b=20
a=30
print(b,a)

# variables Mutables
c = [10, 15]
d = c
c[0] =15
print(d) 

print(nombre)
print(apellido)

