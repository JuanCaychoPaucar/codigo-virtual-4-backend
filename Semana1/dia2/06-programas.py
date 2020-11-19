# import nomb_mod trae todas sus funcionalidades
# import modulo
# from nomb_mod import Clase, fun, met... 
# para usar solamente yo que desee y no usar toda la funcionalidad de la libreria
# En python si queremos usar un archivo que no se encuentra en nuestro mismo nivel sino que externo, se tendrá que agregar al PYTHONPATH (https://docs.python.org/es/3/tutorial/modules.html#the-module-search-path) pero no es recomendable hacer eso si es que nuestro archivo solamente lo vamos a usar una sola vez.
from modulo import despedir, saludar
respuesta = despedir("Eduardo")
respuestaBienvenida = saludar("Johana")
print(respuesta)
print(respuestaBienvenida)
