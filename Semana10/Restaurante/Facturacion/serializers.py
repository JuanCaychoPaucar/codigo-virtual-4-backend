from rest_framework import serializers
from .models import UsuarioModel, MesaModel, CabeceraComandaModel, DetalleComandaModel
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # para usar los 2 tokens
from django.utils import timezone # nos asegura que la configuracion que le indiquemos, se mantenga. Y no toem la hora del servidor que se aloja nuestra app
# from Almacen.models import InventarioModel

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # para la contraseña, no sea visible al mostrar el response

    def save(self):
        usuarioCorreo = self.validated_data.get('usuarioCorreo')
        usuarioNombre = self.validated_data.get('usuarioNombre')
        usuarioApellido = self.validated_data.get('usuarioApellido')
        usuarioTipo = self.validated_data.get('usuarioTipo')
        password = self.validated_data.get('password')

        nuevoUsuario = UsuarioModel(
            usuarioCorreo = usuarioCorreo,
            usuarioNombre = usuarioNombre,
            usuarioApellido = usuarioApellido,
            usuarioTipo = usuarioTipo
        )

        nuevoUsuario.set_password(password) # aca encriptamos la contraseña
        nuevoUsuario.save()

        return nuevoUsuario


    class Meta:
        model = UsuarioModel
        # fields = '__all__'
        exclude = ['groups', 'user_permissions']





class MesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MesaModel
        fields = '__all__'





class CustomPayloadSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user): # cls=> clase
        token = super(CustomPayloadSerializer, cls).get_token(user)
        # luego que ya tenemos definida la token con el padre, podemos agregar nuevos elementos
        token['nombreCompleto'] = user.usuarioNombre + ' ' +user.usuarioApellido
        token['usuarioTipo'] = user.usuarioTipo
        return token





class InicioConsumidorSerializer(serializers.Serializer):
    mesaId = serializers.IntegerField()
    meseroId = serializers.IntegerField()

    def save(self):
        """Acá se guardará la cabecera"""
        # print(self.validated_data)

        #de mi data validada gracias al metodo is_valid, se crea un diccionario validated_data,
        # y otra froma de devolver los resultados de un diccionario es mediante su metodo get('key)
        
        mesaId = self.validated_data.get('mesaId')
        meseroId = self.validated_data.get('meseroId')

        #* PASO 1: cambiar el estado de la mesa segun su id
        # UPDATE t_mesa SET mesa_estado = 0 WHERE mesa_id = mesaId
        # la clausula UPDATE me retornara el total de registros actualizados
        # el metodo UPDATE solo funciona cuando querramos actualizar uno o varios registros
        #* metodo 1
        # mesa = MesaModel.objects.filter(mesaId = mesaId)
        # mesa.update(mesaEstado=False)
        # print(mesa)

        #* metodo 2
        # si uso me metodo first(), ya no poder usar el metodo update(), puesto que solo funciona cuando hay un array de instancias
        mesa = MesaModel.objects.filter(mesaId = mesaId).first() # debemos controlar que la mesaId exista
        mesa.mesaEstado=False
        mesa.save()
        # print(mesa)

        #* PASO 2: crear la cabecera de la comanda con la mesa y el mesero
        mesero = UsuarioModel.objects.filter(usuarioId = meseroId).first()
        print(mesero)
        # print(type(mesero))
        # print(type(mesa))
        nuevaCabecera = CabeceraComandaModel(
            cabeceraFecha = timezone.now(),
            cabeceraTotal = 0.0,
            cabeceraCliente = "",
            mesa = mesa,
            usuario = mesero
        )

        print(nuevaCabecera)
        nuevaCabecera.save()

        return nuevaCabecera




class ComandaDetalleSerializer(serializers.ModelSerializer):
    def save(self):
        # aparte de registrar la comanda, hacer el descuento del inventario
        cantidad = self.validated_data.get('detalleCantidad')
        subtotal = self.validated_data.get('detalleSubtotal')
        cabecera = self.validated_data.get('cabecera')
        inventario = self.validated_data.get('inventario')
        detalleComanda = DetalleComandaModel(
            detalleCantidad=cantidad,
            detalleSubtotal=subtotal,
            cabecera=cabecera,
            inventario=inventario
        )
        detalleComanda.save()

        # cuando usamos un modelSerializer, todas las FK internamente el serializador hace la busqueda para validar
        # print(inventario)

        inventario.inventarioCantidad = inventario.inventarioCantidad - cantidad
        inventario.save()
        # print(detalleComanda.detalleId)
        return detalleComanda
    
    class Meta:
        model = DetalleComandaModel
        fields = '__all__'





class MeseroSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioModel
        fields = ['usuarioNombre', 'usuarioApellido']




class DevolverNotaSerializer(serializers.ModelSerializer):
    # many=True, pues me devuelve una lista de detalles
    detalleComanda = ComandaDetalleSerializer(source="cabeceraDetalles", many=True) #! ver DetalleComandaModel de models.py en related_name
    mesero = MeseroSerializer(source="usuario") #! ver CabeceraComandaModel de models.py en usuario

    class Meta:
        model = CabeceraComandaModel
        fields = '__all__'

