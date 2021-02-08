from rest_framework import generics, status
from .serializers import InventarioModel, InventarioSerializer
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.shortcuts import get_object_or_404

# Create your views here.

class InventariosView(generics.ListCreateAPIView):
    # algunos atributos de la clase generica son:
    queryset = InventarioModel.objects.all() # SELECT * FROM t_inventario
    serializer_class = InventarioSerializer

    def post(self, request):
        # para capturar todo lo que me manda el cliente por el body, uso el request.data
        inventario = self.serializer_class(data=request.data)

        # si se quiere usar el metodo is_valid, obligatoriamente se tiene que pasar al contructor del serializador, el parametro data, sino nos dara un error
        #* raise_exception=True me muestra un mensaje de campos requeridos
        inventario.is_valid(raise_exception=True)  # retorna True o False
        # que si todo es correcto en relacion a los modelos, puedo proceder a hacer el guardado
        # print("Todo bien, todo correcto")

        inventario.save()  # se guarda en la BD

        return Response({
            "ok": True,
            "content": inventario.data
        }, status=status.HTTP_201_CREATED)


    def get(self, request):
        # si nosotros queremos pasar mas de una instancia al srializador (una lista de instancias),
        # tendremos que delarar su parametro many= True, para que internamente haga la iteracion y puedan entender lo que estamos pasando
        resultado = self.serializer_class(instance=self.get_queryset(), many=True) # retorna una lista, por ello agregamos many=True
        print(resultado.data)
        return Response({
            "ok": True,
            "content": resultado.data
        })


class InventarioView(generics.RetrieveUpdateDestroyAPIView):
    # la clase RetrieveUpdateDestroyAPIView me permite utilizar los metodos GET, PUT, DELETE
    queryset = InventarioModel.objects.all()
    serializer_class = InventarioSerializer

    def get(self, request, inventario_id):

        #* PRIMERA FORMA
        # select * from t_inventario WHERE inventario_id = var
        inventario = self.queryset.filter(inventarioId=inventario_id).first() # al utilizar el first(), ya no retornara una lista, sino un objeto. El resto de filtros si nos retorna una lista
        
        #* SEGUNDA FORMA
        # otra forma de hacer select, pero mas delicada
        # al momento de usar el get(), debemos de estar seguros que no nos pasara un campo incorrecto, sino crasheara el programa
        # try:
        #     print(self.queryset.get(inventarioId=inventario_id))
        # except:
        #     raise ParseError("Error")
        
        #* TERCERA FORMA
        # se usa el metodo propio de Django
        # si encuentra un objto con ese filtro lo retornara,sino automaticamente retornara al cliente un estado 404
        # lo que retorna es un objeto NO SERIALIZADO
        # inventarioObject = get_object_or_404(InventarioModel, pk=inventario_id)
        # print(inventarioObject)
        
        
        inventarioSerializado = self.serializer_class(instance=inventario)
        return Response({
            "ok": True,
            "content": inventarioSerializado.data
        })


    def put(self, request, inventario_id):
        # inventarioEncontrado = self.queryset.filter(inventarioId=inventario_id).first()

        # validamos que exista el registro antes de actualizarlo
        inventarioObject = get_object_or_404(InventarioModel, pk=inventario_id)

        inventarioUpdate = self.serializer_class(data=request.data)
        inventarioUpdate.is_valid(raise_exception=True)

        # luego que llamamos al metodo is_valid, este aparte de devolver si es valido o no (bool), nos creara un diccionario con la data correctamente validada,
        # siendo sus llaves los nombres de las columnas y sus valores la data validada.
        # Para usar el validated_data tenemos que llamar previamnete al metodo is_valid() OBLIGATORIAMENTE
        resultado = inventarioUpdate.update(inventarioObject, inventarioUpdate.validated_data)  # me retorna una instancia del objeto tipo inventario
        # print(resultado)
        serializador = self.serializer_class(resultado)

        return Response({
            "ok": True,
            "content" : serializador.data,
            "message" : "Se actualizo el inventario exitosamente"
        }, status=status.HTTP_201_CREATED)


    def delete(self, request, inventario_id):
        inventario = get_object_or_404(InventarioModel, pk=inventario_id)
        # el metodo delete es propio del ORM de Django, en el cual su clausula SQL seria:
        # DELETE FROM t_inventario WHERE inventario_id = pk
        inventario.delete()

        return Response({
            "ok": True,
            "content": None,
            "message": "Se elimino exitosamente el platillo"
        })








# El serializador realiza un filtrado de la data que nos manda el front