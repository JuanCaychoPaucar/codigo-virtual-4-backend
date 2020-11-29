# TAREA - CODIGO VIRTUAL 4 - JUAN CAYCHO

from random import choice
import math

opcion = ""
op = ""

while opcion != "salir":
    print()
    print("EJERCICIOS PROPUESTOS")
    print("[1] Clase")
    print("[2] Libro")
    print("[salir]")
    opcion = input("Seleccione una opcion : ")

    if opcion == "1":  # EJERCICIOS PROPUESTOS EN CLASE
        while op != "salir":
            print()
            print("EJERCICIOS CLASE")
            print("[1] Dibujar rectangulo")
            print("[2] Dibujar hexagono")
            print("[3] Dibujar triangulo invertido")
            print("[4] Serie de Collatz")
            print("[5] Menu principal")
            print("[salir]")
            op = input("Seleccione una opcion : ")

            if op == "1":  # EJERCICIO 1
                x = 0
                while(x < 1):
                    try:
                        print()
                        print("Dibujar rectangulo")
                        altura = int(input("Ingrese altura del rectángulo : "))
                        ancho = int(input("Ingrese ancho del rectángulo : "))
                        print()
                        for i in range(altura):
                            for j in range(ancho):
                                print("*", end="")
                            print()
                        x += 1
                    except:
                        print("Ingresa un numero !!!!")

            elif op == "2":  # EJERCICIO 2
                x = 0
                while(x < 1):
                    try:
                        print()
                        print("Dibujar hexagono")
                        grosor = int(input("Ingrese grosor del hexagono : "))
                        print()

                        espaciado = ""
                        letra = ""
                        incr = grosor
                        linea = ""
                        for i in range(grosor):
                            espaciado = espaciado + " "

                        for i in range(grosor):
                            espaciado = espaciado[0:-1]
                            print(espaciado, end="")

                            for j in range(incr):
                                letra = letra + "*"
                            print(letra)
                            linea = letra
                            letra = ""
                            incr += 2

                        for i in range(grosor-1):
                            print(linea)

                        espaciado = ""

                        for i in range(grosor-1):
                            espaciado = espaciado + " "
                            print(espaciado, end="")
                            for j in range(1):
                                linea = linea[0:-2]
                                print(linea)

                        x += 1
                    except:
                        print("Ingresa un numero !!!!")

            elif op == "3":  # EJERCICIO 3
                x = 0
                while(x < 1):
                    try:
                        print()
                        print("Dibujar triangulo invertido")
                        altura = int(input("Ingrese altura del triangulo : "))
                        print()
                        espaciado = ""

                        for i in range(altura):
                            espaciado = espaciado + "*"

                        for i in range(altura):
                            print(espaciado)
                            espaciado = espaciado[0:-1]

                        x += 1
                    except:
                        print("Ingresa un numero !!!!")

            elif op == "4":  # EJERCICIO 4
                x = 0
                serie = []

                while(x < 1):
                    try:
                        print()
                        print("Serie de Collatz")
                        numero = int(input("Ingrese un numero mayor a 1: "))
                        print()

                        if numero <= 1:
                            print("Ingrese un numero valido")
                        else:
                            serie.append(numero)

                            while numero != 1:
                                if numero % 2 == 0:
                                    numero = numero / 2
                                    numero = round(numero)
                                    serie.append(numero)
                                else:
                                    numero = numero * 3 + 1
                                    numero = round(numero)
                                    serie.append(numero)

                            print(f"La serie de Collatz es : {serie}")

                            x += 1
                    except:
                        print("Ingresa un numero !!!!")

            elif op == "5":
                break

            elif op.lower() == "salir":
                op = "salir"
                opcion = op

            else:
                print("Ingresa solo una de las opciones indicadas")

    elif opcion == "2":  # EJERCICIOS PROPUESTOS DEL LIBRO
        while op != "salir":
            print()
            print("EJERCICIOS LIBRO")
            print("[1] Salario del profesor")
            print("[2] El náufrago satisfecho")
            print("[3] Mayor, menor o igual a 0")
            print("[4] Fábrica de focos")
            print("[5] Ahorro")
            print("[6] Menu principal")
            print("[salir]")
            op = input("Seleccione una opcion : ")

            if op == "1":  # EJERCICIO 1 LIBRO
                print()
                print("Salario del profesor")

                salario = 1500
                incrementoAnual = 0.10

                for i in range(6):
                    print(f"Salario año {i+1} : {round(salario, 2)}")
                    salario = salario + salario * incrementoAnual

            elif op == "2":  # EJERCICIO 2 LIBRO
                sel = "0"
                sencilla = 20
                doble = 25
                triple = 28

                contS = 0
                contD = 0
                contT = 0

                totalPagar = 0

                while(sel != "salir"):
                    try:
                        print()
                        print("El náufrago satisfecho")
                        print("[1] Hamburguesa Sencilla")
                        print("[2] Hamburguesa Doble")
                        print("[3] Hamburguesa Triple")
                        print("[4] Pago en efectivo")
                        print("[5] Pago con tarjeta de credito")
                        print("[6] Menu principal")
                        print("[salir]")

                        sel = input("Seleccione una opcion : ")

                        if sel == "1":
                            cantidad = int(input("Ingrese cantidad de hamburguesas Sencillas : "))
                            totalPagar = totalPagar + sencilla * cantidad
                            contS = contS + cantidad

                        elif sel == "2":
                            cantidad = int(input("Ingrese cantidad de hamburguesas Dobles : "))
                            totalPagar = totalPagar + doble * cantidad
                            contD = contD + cantidad

                        elif sel == "3":
                            cantidad = int(input("Ingrese cantidad de hamburguesas Triples : "))
                            totalPagar = totalPagar + triple * cantidad
                            contT = contT + cantidad

                        elif sel == "4":
                            if totalPagar != 0:
                                print()
                                print("BOLETA")
                                if contS != 0:
                                    print(f"Sencilla : S/ {sencilla} x {contS} = S/ {sencilla * contS}")
                                
                                if contD != 0:
                                    print(f"Doble : S/ {doble} x {contD} = S/ {doble * contD}")
                                
                                if contT != 0:
                                    print(f"Triple : S/ {triple} x {contT} = S/ {triple * contT}")
                                
                                print(f"Total a pagar en efectivo : S/ {totalPagar}")
                                break

                        elif sel == "5":
                            if totalPagar != 0:
                                print()
                                print("BOLETA")
                                if contS != 0:
                                    print(f"Sencilla : S/ {sencilla} x {contS} = S/ {sencilla * contS}")
                                
                                if contD != 0:
                                    print(f"Doble : S/ {doble} x {contD} = S/ {doble * contD}")
                                
                                if contT != 0:
                                    print(f"Triple : S/ {triple} x {contT} = S/ {triple * contT}")
                                
                                print(f"Total a pagar Con tarjeta de credito : S/ {totalPagar * 1.05}")
                                break

                        elif sel.lower() == "salir":
                            sel = "salir"
                            op = sel
                            opcion = sel

                        else:
                            print("Selecciona una opcion válida !!!!")

                    except:
                        print("Ingresa un numero !!!!")

            elif op == "3":  # EJERCICIO 3 LIBRO
                x = 0
                numeros = []
                contIgual = 0
                contMayor = 0
                contMenor = 0

                while(x < 1):
                    try:
                        print()
                        print("Mayor, menor o igual a 0")
                        cantidad = int(input("Ingrese la cantidad de numeros a ingresar : "))
                        print()
                        for i in range(cantidad):
                            numero = int(input(f"Ingrese numero [{i+1}] : "))

                            if numero == 0:
                                contIgual += 1
                                numeros.append(numero)
                            elif numero < 0:
                                contMenor += 1
                                numeros.append(numero)
                            else:
                                contMayor += 1
                                numeros.append(numero)
                        
                        print()
                        print(f"Numeros ingresados : {numeros}")
                        print(f"Mayores a 0 : {contMayor}")
                        print(f"Menores a 0 : {contMenor}")
                        print(f"Iguales a 0 : {contIgual}")
                        
                        x += 1
                    except:
                        print("Ingresa un numero !!!!")

            elif op == "4":  # EJERCICIO 4 LIBRO
                x = 0
                contV = 0
                contB = 0
                contR = 0

                focos = []

                while(x < 1):
                    try:
                        print()
                        print("Fábrica de focos")
                        lote = int(input("Ingrese la cantidad total de focos por lote : "))
                        print()
                        
                        for i in range(lote):
                            foco = choice(["V", "B", "R"])
                            focos.append(foco)

                            if foco == "V":
                                contV += 1
                            elif foco == "B":
                                contB += 1
                            else:
                                contR += 1

                        print(f"Focos en el lote : {focos}")
                        print(f"Focos Verdes : {contV}")
                        print(f"Focos Blancos : {contB}")
                        print(f"Focos Rojos : {contR}")

                        x += 1
                    except:
                        print("Ingresa un numero !!!!")

            elif op == "5":  # EJERCICIO 5 LIBRO
                ahorroInicial = 3
                ahorroDiario = 0
                ahorroTotal = 0

                print()
                print("Ahorro")
                print("Considerando un año de 365 dias")
                print()

                for i in range(365):
                    ahorroDiario = math.pow(ahorroInicial, i+1)
                    ahorroTotal = ahorroTotal + ahorroDiario
                    print(f"Ahorro dia [{i+1}] : {ahorroDiario}")

                print()
                print(f"Ahorro total (365 dias) : {ahorroTotal}")


            elif op == "6":
                break

            elif op.lower() == "salir":
                op = "salir"
                opcion = op

            else:
                print("Ingresa solo una de las opciones indicadas")

    elif opcion.lower() == "salir":  # SALIR DEL PROGRAMA
        break
    
    else:
        print("Ingresa solo una de las opciones indicadas")
