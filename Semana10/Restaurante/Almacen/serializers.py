from rest_framework import serializers
from .models import InventarioModel

# solo se puede usar un modelo por serializador
class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventarioModel
        # los campos como PK(autofield) solamente seran de solo lectura
        fields = '__all__' # voy a usar por completo todas las columnas del inventario
        #fields = ['inventarioPlato'] # si solo deseo mostrar esa columna
        #exclude = ['inventarioPlato'] # si solo deseo exluir esa columna. Solo se usa o el exclude o fields, pero nunca a la vez



class PlatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventarioModel
        fields = ['inventarioPlato']