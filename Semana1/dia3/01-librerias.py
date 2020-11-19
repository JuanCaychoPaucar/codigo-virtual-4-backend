# pip install nombre_paquete
# pip list (lista todas las librerias instaladas en nuestra maquina)
# pip freeze (nos indica las liberias pero de una manera mas tecnica, usada para el deploy)

# Importa toda la liberia y puedo usar toda su funcionalidad
import camelcase

# Selecciono que clase, funcion, etc voy a utilizar de esa liberia
# from camelcase import CamelCase

# igual que la forma anterior pero le puedo dar una alias a esa clase, funcion, etc para que sea mas facil de usar.
# from camelcase import CamelCase as Camello

camello = camelcase.CamelCase()
texto = "Hola amigos feliz miercoles"
print(camello.hump(texto))