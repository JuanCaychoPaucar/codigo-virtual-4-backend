from django.shortcuts import render
from .models import ProductoModel, AlmacenModel, ProductoAlmacenModel
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
# https://www.django-rest-framework.org/api-guide/generic-views/
from rest_framework.response import Response
from .serializers import ProductoSerializer, AlmacenSerializer, ProductoAlmacenSerializer, AlmacenSerializerMany
# para que nos muestre los codigos de status, como ayuda
from rest_framework import status

# Create your views here.
class ProductosView(ListCreateAPIView):
    # queryset => es la consulta a la BD que se va a hacer para efectuar esa vista, utilizando ORM
    # serializer => es la forma en la cual yo voy a decorar mi resultado para mostrarlo al cliente y tambien hace las validaciones para guardar en la BD
    queryset = ProductoModel.objects.all()      # SELECT * FROM T_PRODUCTO
    serializer_class = ProductoSerializer
    # creamos el archivo serializers.py en nuestra aplicacion administracion

    def get(self, request):
        # print(self.get_queryset())

        # pasamos instancias. many=True se encarga de hacer un ciclo for
        respuesta = self.get_serializer(instance=self.get_queryset(), many=True)
        print(respuesta)
        return Response({
            "ok": True,
            "content": respuesta.data,
            "message": None
        }, status=status.HTTP_200_OK)
    
    def post(self, request):
        # request.data es la forma de traer todo lo que me manda el cliente por el body
        producto = self.get_serializer(data=request.data)
        # print(producto.is_valid(raise_exception=True))
        # print(producto.is_valid())
        # print(producto.errors)

        if producto.is_valid():
            producto.save()
            return Response({
                "ok": True,
                "content": producto.data,
                "message": "Se creo exitosamente el producto"
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "ok": False,
                "content": producto.errors,
                "message": "Hubo un error al guardar el producto"
            }, status=status.HTTP_400_BAD_REQUEST)

class ProductoView(RetrieveUpdateDestroyAPIView):
    queryset = ProductoModel.objects.all()
    serializer_class = ProductoSerializer

    def get(self, request, id):
        print(self.get_queryset().filter(productoId=id).first())
        respuesta = self.get_serializer(self.get_queryset().filter(productoId=id).first(), many=False)
        if respuesta:
            return Response({
                "ok": True,
                "content": respuesta.data,
                "message": None
            })
        # else:
        #     return Response({
        #         "ok": False,
        #         "content": respuesta.errors,
        #         "message": None
        #     })

    def put(self, request, id):
        producto = self.get_queryset().filter(productoId=id).first()
        respuesta = self.get_serializer(producto, data=request.data)

        if respuesta.is_valid():
            resultado = respuesta.update()
            return Response({
                "ok": True,
                "content": self.serializer_class(resultado).data,
                "message": "Se actualizo exitosamente el producto"
            }, status=status.HTTP_201_CREATED)

        else:
            return Response({
                "ok": False,
                "content": respuesta.errors,
                "message": "Hubo un error al actualizar el producto"
            }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        # implementar el metodo delete, pero primero implementar la columna estado en el modelo estado y su valor por default sea True
        # ademas, implementar el metodo delete en el serializador,para que se modifique el estado a False
        producto = self.get_queryset().filter(productoId=id).first()
        respuesta = self.get_serializer(producto)
        respuesta.delete()
        return Response({
            "ok": True,
            "content": respuesta.data,
            "message": "Se elimino exitosamente el producto"
        }, status=status.HTTP_200_OK)

# Crear una clase listcreateapiview de los almacenes para solamente devolver todos los almacenes y crear un alamcen

class AlmacenesView(ListCreateAPIView):
    # queryset => es la consulta a la BD que se va a hacer para efectuar esa vista, utilizando ORM
    # serializer => es la forma en la cual yo voy a decorar mi resultado para mostrarlo al cliente y tambien hace las validaciones para guardar en la BD
    queryset = AlmacenModel.objects.all()      # SELECT * FROM T_ALMACEN
    serializer_class = AlmacenSerializerMany
    # creamos el archivo serializers.py en nuestra aplicacion administracion

    def get(self, request):
        # print(self.get_queryset())

        # pasamos instancias. many=True se encarga de hacer un ciclo for
        almacenes = self.get_serializer(instance=self.get_queryset(), many=True)
        print(almacenes)
        return Response({
            "ok": True,
            "content": almacenes.data,
            "message": None
        }, status=status.HTTP_200_OK)

    def post(self, request):
        # request.data es la forma de traer todo lo que me manda el cliente por el body
        almacen = self.get_serializer(data=request.data)

        if almacen.is_valid():
            almacen.save()
            return Response({
                "ok": True,
                "content": almacen.data,
                "message": "Se creo exitosamente el almacen"
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "ok": False,
                "content": almacen.errors,
                "message": "Hubo un error al guardar el almacen"
            }, status=status.HTTP_400_BAD_REQUEST)


class ProductosAlmacenesView(ListCreateAPIView):
    queryset = ProductoAlmacenModel.objects.all()      # SELECT * FROM T_PROD_ALMA
    serializer_class = ProductoAlmacenSerializer
    def get(self, request):
        prodalmas = self.get_serializer(instance=self.get_queryset(), many=True)

        return Response({
            "ok": True,
            "content": prodalmas.data
        })

    def post(self, request):
        info = request.data
        info['productoId']
        info['almacenId']

        print("BUSQUEDA PRODUCTO")
        producto = ProductoModel.objects.filter(productoId=info['productoId']).first()
        print(producto.productoEstado)

        return Response({
            "ok": True,
        })


# AL MOMENTO DE REGISTRAR EL ALMACENPRODUCTO, VALIDAR LO SIGUIENTE:
# * QUE EL PRODUCTO Y  EL ALMACEN EXISTA.
# * QUE EL PRODUCTO ESTE CON ESTADO TRUE Y LO MISMO CON EL ALMACEN (HACER LA MODIFICACION EN EL MODELO Y MIGRAR).

