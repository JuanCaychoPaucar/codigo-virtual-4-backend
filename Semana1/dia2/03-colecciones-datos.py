# LISTAS
# EN LISTAS Y TUPLAS ES RECOMENDABLE DEJAR UNA , AL FINAL
# en JS se le dice Array
colores = ["rojo", "blanco", "azul", "violeta", ]
print(colores)
print(colores[0])

# ultima posicion de un arreglo es: -1
# la penultima: -2
# la antepenultima: -3, etc....
print(colores[-1])

# imprimir desde la 0 hasta la <2
print(colores[0:2])
print(colores[:2])

# imprimir desde la 1 hasta la final
print(colores[1:])

# todas las formas de impresion de las LISTAS, sirven para los textos
nombre = "Eduardo"
print(nombre[2])

# La forma de copiar el contenido (y ya no estan alojados en la misma posisicon de memoria)
colores2 = colores[:]
colores[0] = "verde"
print(colores2)
print(colores)

# imprimir la posicion de memoria
print(id(colores))
print(id(colores2))

# metodo para agregar un nuevo valor dentro de la lista
colores.append("negro")
print(colores)

# metodo para quitar un valor dentro de la lista
colores.remove("blanco")
print(colores)

# para el metodo pop(indice) saca el elemento de la lista segun su posicion y nos da la opcion de almacenarlo en una variable
color_eliminado = colores.pop(2)
print(color_eliminado)
print(colores)

del colores[1]
print(colores)


# metodo para resetar toda la lista y dejarla en blanco
colores.clear()
print(colores)


# TUPLAS
# Coleccion de elementos ordenada QUE NO SE PUEDE MODIFICAR. Es inalterable y sirve para usar elementos que nunca se van a modificar
# conexion server

nombres = ("EDUARDO", "RICK", "ROXANA", "ROXANA", "EDUARDO",)

# longitud de la tupla
print(len(nombres))

# ver si hay elementos repetidos en una tupla
print(nombres.count("EDUARDO"))
print(nombres.count("Eduardo"))


# CONJUNTOS
# Coleccion de elementos desordenada, osea que no tiene indice para acceder a sus elementos
estaciones = {"VERANO", "OTOÑO", "INVIERNO", "PRIMAVERA"}
print(estaciones)

# la forma de iterar es mediante un FOR

# agregar un nuevo valor
estaciones.add("OTOÑOVERANO")
print(estaciones)


# DICCIONARIOS
# es una coleccion de elementos que estan inexados.
# No estan ordenados por una posicion en concreto, sino que manejan una llave y un valor

persona = {
    "id": 1,
    "nombre": "Roberto",
    "fecnac": "01/01/2001",
    "relacion": "soltero",
    "hobbies": {
        "nombre": "Futbol",
        "dificultad": "basico"
    }
}

print(persona["id"])
persona.pop("id")
del persona["nombre"]
print(persona)

persona["apellido"] = "Lopez"
print(persona)

print(persona["hobbies"]["dificultad"])

# para un texto con salto de lineas
variable = """
Esto es un texto
que respeta el salto de linea
y se usa mayormente para documentacion
"""
print(variable)


