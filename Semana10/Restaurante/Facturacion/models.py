from django.db import models

# importamos lo siguiente, para poder realizar modificaciones a la tabla que viene por defecto en Django Rest Framework
# AbstractBaseUser => nos permite realizar modificaciones (agregar o eliminar campos a la tabla)
# PermissionsMixin => dar permisos de administrador, de superusuario o de cliente normal
# BaseUserManager => que comportamientos tendra al crear usuarios, superusuarios
from django.contrib.auth.models import AbstractBaseUser , PermissionsMixin, BaseUserManager

from Almacen.models import InventarioModel

#! Revisar archivo settings.py de Restaurante => AUTH_USER_MODEL

#! CUALQUIER CAMBIO EN LOS MODELOS (campos en la BD), SE DEBE DE REALIZAR LA MIGRACION

# Create your models here.

#* UsuarioManager es la funcionalidad del modelo UsuarioModel. Se realiza fuera del modelo, para separar funcionalidad con el modelo
class UsuarioManager(BaseUserManager):
    """Manejo del modelo del usuario"""

    #! estos metodos se crean para cuando utilicemos py manage.py createsuperuser
    def create_user(self, email, nombre, apellido, tipo, password=None): # crear la funcion con este nombre. # password=None=> depende de la logica del proyecto que se desarrollara
        """Creacion de un nuevo usuario comun y corriente"""
        if not email:
            raise ValueError("El usuario debe de tener obligatoriamente un correo")
        email = self.normalize_email(email)  # normaliza que sea un email, aparte de ver si tiene @ y .  , llevara todo a minusculas y quitara espacios si los hubiera
        usuario = self.model(usuarioCorreo=email, usuarioNombre=nombre, usuarioApellido=apellido, usuarioTipo=tipo) # creamos el objeto usuario, pero aun no se guarda en la BD
        usuario.set_password(password) # con este paso se encripta la contraseña
        usuario.save(using=self._db) # aca recien se guarda en la BD
        return usuario
    
    def create_superuser(self, usuarioCorreo, usuarioNombre, usuarioApellido, usuarioTipo, password): # crear la funcion con este nombre
        """Creacion de un nuevo super usuario que pueda acceder a todas las opciones del panel administrativo"""

        user = self.create_user(usuarioCorreo, usuarioNombre, usuarioApellido, usuarioTipo, password)
        user.is_superuser = True # este campo se crea automaticamente por la herencia de la clase PermissionsMixin
        user.is_staff = True
        user.save(using=self._db)



#! ************************** INICIO TABLA USUARIO **************************
class UsuarioModel(AbstractBaseUser, PermissionsMixin):
    """Modelo de la base de datos de los usuarios del sistema"""
    TIPOS_USUARIO = [
        (1, 'ADMINISTRADOR'),
        (2, 'CAJERO'),
        (3, 'MOZO')
    ]

    usuarioId = models.AutoField(
        db_column="usu_id",
        primary_key=True,
        unique=True
    )
    
    usuarioCorreo = models.EmailField(
        db_column="usu_mail",
        max_length=50,
        unique=True,
        verbose_name="Correo del usuario"
    )

    usuarioNombre = models.CharField(
        db_column="usu_nombre",
        max_length=40,
        verbose_name="Nombre del usuario"
    )

    usuarioApellido = models.CharField(
        db_column="usu_apellido",
        max_length=50,
        help_text="Apellido del usuario",
        verbose_name="Apellido del usuario"
    )

    usuarioTipo = models.IntegerField(
        db_column="usu_tipo",
        help_text="Tipo de usuario",
        choices=TIPOS_USUARIO,
        verbose_name="Tipo del usuario"
    )

    password = models.TextField(
        db_column="usu_pass",
        verbose_name="Contraseña del usuario"
    ) #password => no se le puede cambiar de nombre, pues nos crearia otra columna
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False) # false, pues no todos los usuarios creados van a ser parte de la empresa. Ejm: proveedores, compradores

    objects = UsuarioManager()
    USERNAME_FIELD = 'usuarioCorreo'
    REQUIRED_FIELDS = ['usuarioNombre', 'usuarioApellido', 'usuarioTipo']  #no colocamos usuarioCorreo, pues ya esta como requerido al declararlo en USERNAME_FIELD

    def __str__(self):
        return self.usuarioCorreo
    class Meta:
        db_table = "t_usuario"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

#! ************************** FIN TABLA USUARIO **************************



#! ************************** INICIO TABLA MESA **************************
class MesaModel(models.Model):
    mesaId = models.AutoField(
        db_column="mesa_id",
        primary_key=True,
        null=False
    )

    mesaNumero = models.CharField(
        max_length=15,
        db_column="mesa_numero"
    )

    mesaCapacidad = models.IntegerField(
        db_column="mesa_capacidad",
        null=False
    )

    mesaEstado = models.BooleanField(
        db_column="mesa_estado",
        default=True
    )

    def __str__(self):
        return self.mesaNumero
    
    class Meta:
        db_table = "t_mesa"
        verbose_name = "Mesa"
        verbose_name_plural = "Mesas"

#! ************************** FIN TABLA MESA **************************



#! ************************** INICIO TABLA COMANDA_CABECERA **************************
class CabeceraComandaModel(models.Model):
    cabeceraId = models.AutoField(
        db_column="cabecera_id",
        primary_key=True,
        null=False,
        unique=True
    )

    cabeceraFecha = models.DateField(
        db_column="cabecera_fecha",
        null=False,
        verbose_name="Fecha del pedido"
    )

    cabeceraTotal = models.DecimalField(
        db_column="cabecera_total",
        null=False,
        decimal_places=2,
        max_digits=5,
        verbose_name="Total del pedido"
    )

    cabeceraCliente = models.CharField(
        db_column="cabecera_cliente",
        null=False,
        max_length=50,
        verbose_name="Nombre del cliente"
    )

    cabeceraEstado = models.CharField(
        db_column="cabecera_estado",
        null=False,
        max_length=50,
        verbose_name="Estado del pedido",
        default="ABIERTO"
    )

    # Luego cramos las relaciones
    #! revisar clase semana 4, dia 3, Minimarket/administracion/models
    # CASCADE => esta opcion va a permitir eliminar el padre y que cuando se elimine este, automaticamente todos los hijos se eliminen tambien.
    # PROTECT => esta opcion NO va a permitir eliminar el padre, y solamente se va a poder eliminar el padre cuando NO tenga ningun hijo relacionado
    # SET_NULL => permite eliminar al padre, pero cuando este es eliminado, todos sus hijos quedan sin padre, es decir su campo de FK cambia de valor a NULL
    # DO_NOTHING => deja eliminar al padre y no elimina su valor del hijo, es decir se queda con esa llave aunque ya no exista.
    #               Esto genera una mala integridad de los datos y crea errores al momento de devolver segun su padre
    
    mesa = models.ForeignKey(
        to=MesaModel,
        db_column="mesa_id",
        verbose_name="Mesa",
        on_delete=models.PROTECT,
        related_name="mesaComandas" # related_name se usa para las relaciones inversas
    )

    usuario = models.ForeignKey(
        to=UsuarioModel,
        db_column="mesero_id",
        verbose_name="Usuario",
        on_delete=models.PROTECT,
        related_name="usuarioComandas" # related_name se usa para las relaciones inversas
    )

    def __str__(self):
        return self.cabeceraCliente

    class Meta:
        db_table = "t_comanda_cabecera"
        verbose_name = "Comanda"
        verbose_name_plural = "Comandas"

#! ************************** FIN TABLA COMANDA_CABECERA **************************



#! ************************** INICIO TABLA COMPROBANTE **************************
class ComprobanteModel(models.Model):
    comprobanteId = models.AutoField(
        db_column="comprobante_id",
        primary_key=True,
        null=False,
        unique=True
    )

    comprobanteSerie = models.CharField(
        db_column="comprobante_serie",
        max_length=4,
        null=False,
        verbose_name="Serie del comprobante"
    )

    comprobanteNumero = models.IntegerField(
        db_column="comprobante_numero",
        null=False,
        verbose_name="Numero del comprobante"
    )

    comprobanteTipo = models.IntegerField(
        db_column="comprobante_tipo",
        null=False,
        verbose_name="Tipo de comprobante"
    )

    comprobanteCliIdentificacion = models.CharField(
        db_column="comprobante_identificacion",
        max_length=11,
        null=False,
        verbose_name="Identificacion del cliente"
    )

    comprobantePdf = models.TextField(
        db_column="comprobante_pdf",
        null=False,
        verbose_name="PDF del comprobante"
    )

    comprobanteCdr = models.TextField(
        db_column="comprobante_cdr",
        null=False,
        verbose_name="Codigo de respuesta del comprobante"
    )

    comprobanteXML = models.TextField(
        db_column="comprobante_xml",
        null=False,
        verbose_name="XML del comprobante"
    )

    cabecera = models.OneToOneField(
        to=CabeceraComandaModel,
        db_column="cabecera_id",
        on_delete=models.CASCADE,
        related_name="comanda_cabecera",
        verbose_name="Comanda"
    )

    def __str__(self):
        return "%s %s"%(self.comprobanteSerie, self.comprobanteNumero)

    class Meta:
        db_table = "t_comprobante"
        verbose_name = "Comprobante"
        verbose_name_plural = "Comprobantes"

#! ************************** FIN TABLA COMPROBANTE **************************



#! ************************** INICIO TABLA COMANDA_DETALLE **************************
class DetalleComandaModel(models.Model):
    detalleId = models.AutoField(
        db_column="detalle_id",
        primary_key=True,
        null=False
    )

    detalleCantidad = models.IntegerField(
        db_column="detalle_cantidad",
        null=False,
        verbose_name="Cantidad"
    )

    detalleSubtotal = models.DecimalField(
        db_column="detalle_subtotal",
        max_digits=5,
        decimal_places=2,
        null=False,
        verbose_name="SubTotal includio IGV"
    )

    # FK
    inventario = models.ForeignKey(
        db_column="inventario_id",
        to=InventarioModel,
        on_delete=models.PROTECT,
        verbose_name="Inventario",
        related_name="inventarioDetalles"
    )

    cabecera = models.ForeignKey(
        to=CabeceraComandaModel,
        db_column="cabecera_id",
        on_delete=models.PROTECT,
        verbose_name="Cabecera",
        related_name="cabeceraDetalles"
    )

    class Meta:
        db_table="t_comanda_detalle"
        verbose_name = "Detalle"
        verbose_name_plural = "Detalles"

#! ************************** FIN TABLA COMANDA_DETALLE **************************



#! COMANDOS
# py manage.py makemigrations Facturacion
# py manage.py showmigrations
# py manage.py migrate
# py manage.py createsuperuser

# PRIMERO SE HACE LA MIGRACION DE LA APLICACION MAESTRA, QUE NO TENGA LLAVES FORANEAS
# py manage.py makemigrations Almacen
# py manage.py makemigrations Facturacion

# borramos la carpeta migrations, cuando modifiquemos las tablas nativas de usuario, luego de que ya hicimos la migracion inicial