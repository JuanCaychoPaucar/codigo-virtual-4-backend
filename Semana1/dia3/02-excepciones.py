# excepciones => try {...} catch{...} eso es en JS
# excepciones => try ... except ...    opcionales: else ...  finally ...  esto es en PYTHON

# https://www.tutorialsteacher.com/python

try:
    # todo el codigo que sea escrito adentro, tendra un manejo de por si sucede algo malo, el except va a evitar que el programa se cuelgue
    numero1 = input("ingrese un numero: ")
    numeroEntero = int(numero1)
    numero2 = input("Ingrese un segundo numero: ")
    numeroEntero2 = int(numero2)

    print(numeroEntero/numeroEntero2)
except ZeroDivisionError:
    print("No puedes ingresar 0 como divisor")
except ValueError:
    print("Ingresa un numero y no letras")
except:
    print(EnvironmentError)
    print("Algo debiste haber hecho mal, intenta nuevamente")
else:
    # ingresa al else cuando no ingreso a ninguna excepcion
    print("Todo funciono correctamente")
finally:
    # no le importa si todo salio bien o si hubo un error
    print("Yo me ejecuto si o si")
    
print("Yo soy otra parte del codigo")

# x = 0
# arreglo = []
# while(x < 10):
#     try:
#         num = int(input("Ingrese un numero : "))
#         arreglo.append(num)
#         x += 1
#     except:
#         print("Ingresa un numero !!!!")

# print(arreglo)

# si el try esta fuera del while, entonces todo el while se reiniciara
