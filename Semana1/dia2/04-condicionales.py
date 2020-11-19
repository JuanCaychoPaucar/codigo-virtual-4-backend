# CONDICIONAL IF ELSE ELIF
# edad = 70
# restriccion = 18

# if edad >= restriccion and edad <65:
#     print("eres mayor de edad")
# elif edad >= 65:
#     print("estas jubilado")
# else:
#     print("eres menor de edad")

# ELIF sirve para usarse en casos de cas switch (PYTHON no existe el SWITCH CASE)

# Ingresar un numero por el teclado y que me diga si es mayor que 0, igual a 0 o menor que 0

# numero = input("Ingrese numero: ")
# numero = int(numero)
# restriccion = 0
# if numero > restriccion:
#     print("es mayor a 0")

# if numero < restriccion:
#     print("es menor a 0")

# if numero == restriccion:
#     print("es igual a 0")


# FOR => Es un bloque repetitivo
# texto = "GOL DE ARGENTINA"
# for letra in texto:
#     print(letra)

# print()

# el metodo range recibe de 1 a 3 valores
# 1 : es el tope
# 2 : el primero es el inicio y el segundo es el tope
# 3 : el primero es el inicio y el segundo es el tope y el tercero es de cuanto en cuanto se va a incrementar o decrementar en cada ciclo

# for i in range(1, 10, 3):
#     print(i)

# for i in range(len(texto)):
#     print(i)

# for i in range(len(texto)):
#     print("posicion {}: {}".format(i, texto[i]))


# break => para parar el bucle
# for i in range(10):
#     print(i)
#     if i == 5:
#         break

# continue => salta la iteraccion actual
# for i in range(10):
#     if i == 5:
#         continue
#     print(i)

# while => es un bucle infinito hasta que la condicion deje de ser cierta
variable = True
while variable:
    print("a")
    variable = False

# en python no hay do ni switch case
# Ingresar 10 valores por teclado y almacenarlos en una lista, y luego que me diga cuantos son pares y cuantos son impares:

numeros = []
contadorPar = 0
contadorInpar = 0

for i in range(10):
    n = int(input("Ingrese numero {}: ".format(i+1)))
    if n % 2 == 0:
        contadorPar += 1
    else:
        contadorInpar += 1
    numeros.append(n)

print("pares : {}".format(contadorPar))
print("impares : {}".format(contadorInpar))

print("Lista de numeros : {}".format(numeros))

# operador ternario
#  resultado = rpta_si if condicion else rpta_no
# resultado = 5 if 10 % 2 == 0 else 10
