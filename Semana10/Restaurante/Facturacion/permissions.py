from rest_framework.permissions import BasePermission

class SoloCajeros(BasePermission):
    def has_permission(self, request, view):
        # Restringir el acceso para que solamente un usuario de tipo 3 (mesero) y metodo GET pueda acceder a las mesas
        # Restringir el acceso para que solamente un usuario de tipo 1 (administrador) y metodo POST pueda acceder para crear una mesa

        #* usamos IsAuthenticated en la vista (linea 40 => views.py de Facturacion)
        # if (request.auth == None):
        #     return False

        # print(request.user)
        # print(request.auth)
        # print(request.method)
        # print(view)
        
        if(request.user.usuarioTipo == 3 and request.method == "GET"):
            print("MESERO")
            return True

        if(request.user.usuarioTipo == 1 and request.method == "POST"):
            print("PASA ADMIN")
            return True



class SoloMeseros(BasePermission):
    def has_permission(self, request, view):
        if(request.user.usuarioTipo == 3):
            return True
        return False