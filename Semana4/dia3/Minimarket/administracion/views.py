from django.shortcuts import render
from .models import ProductoModel, AlmacenModel, ProductoAlmacenModel, CabeceraVentaModel, DetalleVentaModel
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
# https://www.django-rest-framework.org/api-guide/generic-views/
from rest_framework.response import Response
from .serializers import (  ProductoSerializer,
                            AlmacenSerializer,
                            ProductoAlmacenSerializer,
                            AlmacenSerializerMany,
                            CabeceraVentasSerializer,
                            VentaSerializer)

# para que nos muestre los codigos de status, como ayuda
from rest_framework import status

# Create your views here.
# las APIViews sirve para darnos una serie de metodos predefinidos que pueden ser modificados. 
# Pero si nosotros dentro de esa clase agregamos un metodo que no viene predeterminado, se creara sin ningun problema.
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
        # AL MOMENTO DE REGISTRAR EL ALMACENPRODUCTO, VALIDAR LO SIGUIENTE:
        # * QUE EL PRODUCTO Y  EL ALMACEN EXISTA.
        # * QUE EL PRODUCTO ESTE CON ESTADO TRUE Y LO MISMO CON EL ALMACEN (HACER LA MODIFICACION EN EL MODELO Y MIGRAR).

        # VERIFICAR SI YA HAY UN REGISTRO DE ESE ALMACEN CON PRODUCTO Y TRAER LA INFORMACION (CANTIDAD) Y MODIFICARLA CON LA NUEVA INGRESADA

        info = request.data
        productoAlmacenSerializado = self.get_serializer(data=info)
        # print(productoAlmacenSerializado.is_valid())
        # print(productoAlmacenSerializado.errors)

        if productoAlmacenSerializado.is_valid():
            # aca recien va la logica de los estados y otros
            producto = ProductoModel.objects.filter(productoId=info['productoId']).first()
            almacen = AlmacenModel.objects.filter(almacenId=info['almacenId']).first()

            # validated_data es un diccionario que se crea a partir de pasarle una data y luego gracias al metodo is_valid(),
            # se crea esa data validada en la cual se corrobora que todas las llaves foraneas y todos los campos esten correctamente ingresados

            # print("nuevoooooooo")
            # print(productoAlmacenSerializado.validated_data['productoId'].productoEstado)

            # verificamos los estados
            if producto.productoEstado and almacen.almacenEstado:
                inventario = ProductoAlmacenModel.objects.filter(productoId=info['productoId'], almacenId=info['almacenId']).first()
                if inventario:
                    # voy a tener que sobreescribir mi productoalmacen
                    # cuando yo uso el metodo update de mi serializador, le tengo que pasar 2 parametros: 
                    # el primero es la instancia (el campo ya creado en mi BD que yo quiero actualizar)
                    # el segundo es todo el contenido que yo quiero actualizar en mi BD
                    # y automaticamente ya hace el guardado en mi BD (implicitamente hace el save), por lo que yo no tengo que volver a usar el metodo save(), sino se creara
                    # otra instancia de mi objeto creado 
                    productoAlmacenSerializado.update(inventario, productoAlmacenSerializado.validated_data)

                    return Response({
                        "ok": True,
                        "content": productoAlmacenSerializado.data,
                        "message": "Se actualizó exitosamente el productoalmacen con su nueva cantidad"
                    }, status=status.HTTP_201_CREATED)

                else:
                    # voy a tener que crear un nuevo productoalmacen
                    productoAlmacenSerializado.save()
                    return Response({
                        "ok": True,
                        "content": productoAlmacenSerializado.data,
                        "message": "Se agregó exitosamente el producto con almacen"
                    }, status=status.HTTP_201_CREATED)
                
            else:
                return Response({
                    "ok": False,
                    "content": None,
                    "message": "No se logró ingresar correctamente los datos, producto o almacen no esta correctamente habilitado"
                }, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({
                "ok": False,
                "content": productoAlmacenSerializado.errors,
                "message": "Hubo un error al registrar el producto almacen"
            }, status=status.HTTP_400_BAD_REQUEST)


class CabeceraVentasView(ListAPIView):
    queryset = CabeceraVentaModel.objects.all()
    serializer_class = CabeceraVentasSerializer

    def get(self, request):
        resultado = self.get_serializer(instance=self.get_queryset(), many=True)
        # devolver todas las cabecerasventas de mi tabla

        return Response({
            "ok": True,
            "content": resultado.data,
            "message": None
        }, status=status.HTTP_200_OK)


class VentaView(CreateAPIView):
    queryset = DetalleVentaModel.objects.all()
    serializer_class = VentaSerializer

    def post(self, request):
        respuesta = self.get_serializer(data=request.data)
        respuesta.is_valid(raise_exception=True)

        for articulo in respuesta.data['articulos']:
            # print(articulo['id'])
            # ver si existen en la BD
            producto = ProductoModel.objects.filter(productoId=articulo['id']).first()

            if (producto is None or producto.productoEstado == False):
                return Response({
                    "ok": False,
                    "message": "Verifique los productos ingresados"
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # II VALIDAR LAS CANTIDADES
        for articulo in respuesta.data['articulos']:
            producto = ProductoModel.objects.filter(productoId=articulo['id']).first()
            # gracias al related_name indicado en la llave foranea, yo puedo ingresar a su relacion inversa (relacion del padre hacia los hijos)
            # y devolver todos sus registros (rows) de ese padre
            cantidadSolicitada = articulo['cantidad']
            print("La cantidad solicitada es: ", cantidadSolicitada)
            productoAlmacenes = producto.productosAlmacenes.all()  # productosAlmacenes => viene de models.py, ProductoAlmacenModel
            # print("producto almacenes")
            # print(productoAlmacenes)

            # Ahora hay que ver si existe la cantidad indicada en los inventarios
            # devolver la cantidad de ese producto en determinado productoalmacen
            cantidadAlmacen = 0

            for productoAlmacen in productoAlmacenes:
                # print(productoAlmacen.productoAlmacenCantidad)
                cantidadAlmacen += productoAlmacen.productoAlmacenCantidad
            print("La cantidad en stock es", cantidadAlmacen)

            if cantidadSolicitada > cantidadAlmacen:
                return Response({
                    "ok": False,
                    "message": ("La cantidad solicitada del articulo " + str(articulo['id']) + ", es mayor que la que hay en el inventario")
                })

        # III REALIZAR EL GUARDADO DE LA CABECERA VENTA
        cabeceraVenta = CabeceraVentaModel(cabeceraVentaFecha=respuesta.data['fecha'], cabeceraVentaTotal=0, cabeceraVentaNombre=respuesta.data['nombre'])
        cabeceraVenta.save()
        # Se tiene que hacer el guarado de la cabecera en otra linea despues de crear la instancia, 
        # porque sino lo capturado sera lo devuelto por el metodo save(), que en django no retorna nada
        detalles = []
        precioFinal = 0

        # IV REALIZAR EL GUARDADO DE CADA ARTICULO
        for articulo in respuesta.data['articulos']:
            producto = ProductoModel.objects.filter(productoId=articulo['id']).first()
            precioTotal = producto.productoPrecio * articulo['cantidad']

            # para crear con una FK es necesario pasar todo el objeto (instancia) de mi modelo y no solamente su numero de primary key
            detalle = DetalleVentaModel(productoId=producto, cabeceraVentaId=cabeceraVenta, detalleVentaCantidad=articulo['cantidad'], detalleVentaSubTotal=precioTotal)
            detalle.save()
            detalles.append(detalle)
        print(detalles)

        # V MODIFICAR EL PRECIO FINAL DE MI CABECERA
        cabeceraVenta.cabeceraVentaTotal = precioFinal
        cabeceraVenta.save()

        # VI ACTUALIZAR SUS CANTIDADES DE LA TABLA PRODUCTOALMACEN
            
        return Response({
            "ok": True,
            "content": respuesta.data
        }, status=status.HTTP_201_CREATED)

