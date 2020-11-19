# def
def saludar():
    """ FUNCION QUE TE SALUDA """
    print("Hola, buenas noches")


saludar()


def saludarConNombre(nombre):
    print(f"Hola {nombre}")


saludarConNombre("Juan")

# None es igual que null en JS

# Si queremos que un parametros ea opcional de dar su valor, le podemos definir el valor PREDETERMINADO al momento de defiir la funcion
# Todos los parametros que son opcionales de recibir valor, siempre van despues de los que no son opcionales


def saludoOpcional(apellido, nombre=None):
    if nombre:
        print(f"Hola {nombre} {apellido}")
    else:
        print("Hola {apellido}")


saludoOpcional("martinez")
saludoOpcional("martinez", "Eduardo")


def suma(num1, num2):
    """Funcion que recibe 2 numeros y retorna su sumatoria"""
    return num1 + num2
    # todo lo que pongamos despues del return nunca se va a ejecutar


resultado = suma(5, 2)
print(resultado)


# el parametro *args arguments es una lista dinamica de elementos para recibir un numero indeterminado de parametros
def hobbies(*args):
    print(args)
    for elemento in args:
        print(elemento)


hobbies("bicicleta", "puenting", "rafting", 20, ["1", 2, 3])


# **kwargs "keywords arguments" es un parametro para recibir un numeroilimitado de parametros, pero usando llave y valor (diccionario)

def personas(**kwargs):
    print(kwargs)


personas(nombre="Eduardo", apellido="De Rivero", macotas=False)

print()
# primero son los args y luego los kwards


def indeterminada(*args, **kwards):
    print(args)
    print(kwards)


indeterminada(5, "Juan", "otoño", False, pais="Perú", epoca="Republicana")

# cuando aun no le coloquemos la logica a nuestra funcion y no nos muestre error, usamos pass


# def sacar_igv(igv):
#     pass


# FUNCIONES LAMBDA
# PEQUEÑA Y ANONIMA
# nombre = lambda PARAM: RETURN(rpta)
def resultado2(numero): return numero + 30

print(resultado2(10))


def resultado3(numero1, numero2): return numero1 + numero2

print(resultado3(80, 20))

# GENERALMENTE SE USA PARA OPERACIONES CORTAS DE  UN MAXIMO DE UNA LINEA DE RESOLUCION