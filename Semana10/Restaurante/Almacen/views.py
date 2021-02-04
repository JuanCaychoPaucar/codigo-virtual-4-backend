from rest_framework import generics, status
from .serializers import InventarioModel, InventarioSerializer
from rest_framework.response import Response

# Create your views here.

class InventarioView(generics.ListCreateAPIView):
    # algunos atributos de la clase generica son:
    queryset = InventarioModel.objects.all() # SELECT * FROM t_inventario
    serializer_class = InventarioSerializer

    def post(self, request):
        # para capturar todo lo que me manda el cliente por el body, uso el request.data
        inventario = self.serializer_class(data=request.data)

        # si se quiere usar el metodo is_valid, obligatoriamente se tiene que pasar al contructor del serializador, el parametro data, sino nos dara un error
        inventario.is_valid()  # retorna True o False

        return Response({
            "ok": True
        }, status=status.HTTP_201_CREATED)


# El serializador realiza un filtrado de la data que nos manda el front