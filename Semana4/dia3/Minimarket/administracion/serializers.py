from rest_framework import serializers
from .models import ProductoModel, AlmacenModel, ProductoAlmacenModel, CabeceraVentaModel

# es similar al reqparse de flask
# https://www.django-rest-framework.org/api-guide/serializers/

class ProductoSerializer(serializers.ModelSerializer):
    # clase meta es para pasar pamametros al padre
    class Meta:
        model = ProductoModel
        fields = "__all__"  # todos los campos
        # o uso el fields o uso el exclude, mas no los 2 al mismo tiempo
        # exclude = ["campo1", "campo2", ..]

    # instance => atributo que me da cuando mando el objeto
    def update(self):
        # print(self.instance)
        # print(self.validated_data)
        # print(self.validated_data["productoNombre"])
        # .get(valor, si no le pasamos ningun valor)
        self.instance.productoNombre = self.validated_data.get("productoNombre", self.instance.productoNombre)
        self.instance.productoPrecio = self.validated_data.get("productoPrecio", self.instance.productoPrecio)        
        self.instance.productoMinimo = self.validated_data.get("productoMinimo", self.instance.productoMinimo)
        self.instance.save()
        
        return self.instance
        # self.instance.productoNombre

    def delete(self):
        self.instance.productoEstado =  False
        self.instance.save()

        return self.instance



class AlmacenSerializer(serializers.ModelSerializer):
    # clase meta es para pasar pamametros al padre
    class Meta:
        model = AlmacenModel
        fields = "__all__"



class ProductoAlmacenSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(source="productoId", read_only=True)
    almacen = AlmacenSerializer(source="almacenId", read_only=True)

    # clase meta es para pasar pamametros al padre
    class Meta:
        model = ProductoAlmacenModel
        fields = "__all__"
        # exclude = ['productoId', 'almacenId']
        # https://www.django-rest-framework.org/api-guide/serializers/#additional-keyword-arguments
        # la configuracion adicional que yo le pueda colocar a los campos de mi modelo, se la pongo en el atributo llamado  extra_kwargs.
        # le puedo modificar parametros del mismo modelo, como su longitud maxima (max_lenght) o longitud minima (min_lenght)
        extra_kwargs = {
            "productoId": {
                "write_only": True
            },
            "almacenId": {
                "write_only": True
            }
        }


# este serializador lo voy a usar cuando quiera devolver, de mis productos, sus almacenes
class ProductoAlmacenAlmacenVistaSerializer(serializers.ModelSerializer):
    almacen = AlmacenSerializer(source="almacenId", read_only=True)

    class Meta:
        model = ProductoAlmacenModel
        fields = ['almacen']


# este serializador lo voy a usar cuando quiera devolver, de mis almacenes, sus productos
class ProductoAlmacenProductoVistaSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(source="productoId", read_only=True)

    class Meta:
        model = ProductoAlmacenModel
        fields = ['producto']



class AlmacenSerializerMany(serializers.ModelSerializer):
    # esto es una relacion inversa, porque a partir del padre estoy devolviendo a todos sus hijos que le pertencen
    # y necesito para ello el campo related_name definido en la foreign key
    productosAlmacen = ProductoAlmacenProductoVistaSerializer(source="almacenesProductos", many=True, read_only=True)
    
    class Meta:
        model = AlmacenModel
        fields = "__all__"



class CabeceraVentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = CabeceraVentaModel
        fields = "__all__"



class ItemDiccionario(serializers.Serializer):
    # un Serializer, si se hereda es automaticamente un diccionario
    id = serializers.IntegerField()
    cantidad = serializers.IntegerField()


# no solamente se usa serializadores para modelos, tambien se pueden usar para validar campos independientes de algun modelo
# solamente cuando nosotros queremos usar una lista sin importar que contenga, usamos el serializer.ListField, 
# si muy por el contrario queremos usar otro serializador(herencia) tenemos que simplemente llamarlo y con poner como parametro "many=True" 
# ya se convertira en una Lista y recordar que todo serializador es al final un diccionario
class VentaSerializer(serializers.Serializer):
    articulos = ItemDiccionario(many=True)
    fecha = serializers.DateTimeField()
    nombre = serializers.CharField(max_length=45)
