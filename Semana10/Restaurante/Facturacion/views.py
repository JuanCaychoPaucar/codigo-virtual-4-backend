from rest_framework import generics, status
from .models import MesaModel, CabeceraComandaModel
from .serializers import RegistroSerializer, MesaSerializer, CustomPayloadSerializer, InicioConsumidorSerializer, ComandaDetalleSerializer, DevolverNotaSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import SoloCajeros, SoloMeseros
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes


# AllowAny => Permite que todos los controladores no pidan autenticacion
# IsAuthenticated => No va a permitir que pueda proceder sin que no se haya dado un token
# IsAuthenticatedOrReadOnly => Solamente va a permitir acceder a metodos GET, sin la necesidad de una token

# Create your views here.

class RegistroUsuarioView(generics.CreateAPIView):
    serializer_class = RegistroSerializer
    def post(self, request):
        nuevoUsuario = self.serializer_class(data=request.data)
        nuevoUsuario.is_valid(raise_exception=True)
        nuevoUsuario.save()
        print(nuevoUsuario)

        return Response({
            "ok" : True,
            "content": nuevoUsuario.data
        }, status=status.HTTP_201_CREATED)





class CustomPayloadView(TokenObtainPairView):
    permission_classes = [AllowAny,]
    serializer_class = CustomPayloadSerializer




class MesasView(generics.ListCreateAPIView):
    queryset = MesaModel.objects.all()
    serializer_class = MesaSerializer

    #! SE LE PASA LA TOKEN ACCESS EN AUTHORIZATION
    # Este es el atributo que va a regir en toda mi view y va a permitir o denegar ciertos accesos
    # permission_classes = [AllowAny] # va de la mano con el JWT. Solo recibe un array
    # permission_classes = [IsAuthenticated] # me pide estar autenticado
    # permission_classes = [IsAuthenticatedOrReadOnly] # solo lectura sin estar autenticado

    permission_classes = [IsAuthenticated, SoloCajeros]

    def get(self, request):
        # instance=> porque debemos realizar una consulta a la BD, la cual devuelve instancias de la clase
        resultado = self.serializer_class(instance=self.get_queryset(), many=True)
        # print(type(resultado))
        return Response({
            "ok" : True,
            "content" : resultado.data,
            "message" : None
        })


    def post(self, request):
        # primero le paso la data que el cliene me manda para que sea serializada y validada
        nuevaMesa = self.serializer_class(data=request.data)

        # el valor initial_data me mostrara toda la data que le estoy pasando sin aplicar ningun filtro (serializador)
        print(nuevaMesa.initial_data)

        # el metodo is_valid(), aparte de devolver un booleano o de lanzar una excepcion, si es que tiene el parametro raise_exception=True,
        # aplicara un filtro entre todo lo que ingresó al serializador vs todo lo que necesita para cumplir con lo necesario por el model
        nuevaMesa.is_valid(raise_exception=True)

        nuevaMesa.save()

        # una vez hecho ese filtro, recien se puede llamar al atributo .data,
        # pero si se va a guardar en la BD no se puede acceder a este atributo hasta despues de guardarlo
        print(nuevaMesa.data)

        return Response({
            "ok": True,
            "content": nuevaMesa.data,
            "message" : "Se creó la mesa exitosamente"
        }, status=status.HTTP_201_CREATED)





# controlador en el cual me muestre las mesas disponibles
# se usa mas un apiview cuando nosotros tengamos que solamente usar un metodo (GET, POST, PUT)
# asi nos evitaremos crear una clase con todos sus atributos
@api_view(['GET'])
@permission_classes([IsAuthenticated, SoloCajeros])
def mesas_disponibles(request):
    # usar el serializador MesaSerializer
    # hacer una busqueda de toas ls mesas con estado true
    # retornar ese resultado
    mesas = MesaModel.objects.filter(mesaEstado = True).all()
    resultadoSerializado = MesaSerializer(instance=mesas, many=True)

    return Response({
        "ok" : True,
        "content" : resultadoSerializado.data,
        "message" : None
    })



class ComandasView(generics.ListCreateAPIView):
    serializer_class = InicioConsumidorSerializer
    def post(self, request):
        resultado = InicioConsumidorSerializer(data=request.data)
        resultado.is_valid(raise_exception=True)
        resultado.save()
        return Response({
            "ok" : True,
            "content" : None,
            "message" : "Se creó la comanda exitosamente"
        })
        pass

    def get(self, request):
        pass



class CrearPedidoView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, SoloMeseros]
    serializer_class = ComandaDetalleSerializer

    def post(self, request):
        resultado = self.serializer_class(data=request.data)
        resultado.is_valid(raise_exception=True)
        resultado.save()

        return Response({
            "ok": True,
            "content": resultado.data,
            "message": None
        })
        



class GenerarNotaPedidoView(generics.ListAPIView):
    serializer_class = DevolverNotaSerializer
    queryset = CabeceraComandaModel.objects.all()

    def get_queryset(self, id):
        return self.queryset.filter(cabeceraId=id).first()

    def get(self, request, id_comanda):
        resultado = self.serializer_class(instance=self.get_queryset(id_comanda))
        return Response({
            "ok": True,
            "content": resultado.data,
            "message": None
        })
        
    


@api_view(['POST'])
# crear un permission para que solamente un mesero pueda registrar un pedido
# @permission_classes([IsAuthenticated, SoloMeseros])
def crear_pedido(request):
    return Response('ESTA RUTA NO SIRVE')





