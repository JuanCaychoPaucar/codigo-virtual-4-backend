codigo = "virtual4"

# el metodo print() va a recoger un numero ilimitado de parametros, separados por ","
# y siempre ente coma y coma va a imprimir un espacio en blanco
print(codigo, "otra cosa")

# MODO II
alumnos = 38
print("Estoy en el curso {} y hay {} alumnos".format(codigo, alumnos))

# MODO III
# modificando el orden a imprimir. Parecido a las posiciones de un arreglo
print("Tengo {1} alumnos del curso {0}".format(codigo, alumnos))

# MODO IV
print(f"Tengo {alumnos} alumnos en el curso {codigo}")

# RESTRINGIR LA CANTIDAD DE ECIMALES DE UNA VARIABLE
pi = 3.141515
print(f"El valor de pi es: {pi:1.3f}")
