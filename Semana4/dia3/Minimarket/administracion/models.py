from django.db import models
# Para ver todos los tipos de los modelos:
# https://docs.djangoproject.com/en/3.1/ref/models/fields/

# Create your models here.

class ProductoModel(models.Model):
    # si yo no defino la primary key, se va a crear automaticamente en mi BD con el nombre Id
    # solamente pude haber un AutoField por modelo
    # si no indico el nombre de la columna en la base de datosm se va a crear con el nombre del atributo
    productoId = models.AutoField(auto_created=True, primary_key=True, unique=True, null=False, db_column='prod_id')
    productoNombre = models.CharField(max_length=45, db_column='prod_nom', verbose_name='Nombre del producto')
    productoPrecio = models.DecimalField(max_digits=5, decimal_places=2, db_column='prod_prec', verbose_name='Precio del producto')
    productoMinimo = models.IntegerField(db_column='prod_minimo', verbose_name='Cantidad minima del producto')
    productoEstado = models.BooleanField(db_column='prod_estado', verbose_name='Estado del producto', null=False, default=True)

    # para definir algunas opciones extras, como el nombre de la tabla, ordenamineto y modificar opciones de visualizacion,
    # en el panel administrativo se crea una clase Meta

    class Meta:
        # esta clase sirve para pasar metadatos al padre, es decir,
        # como estamos heredando de la clase Model, le vamos a pasar configuracion a ese padre
        db_table = 't_producto'

        # para cambiar algunas opciones del panel administrativo
        verbose_name_plural = "Productos"
        verbose_name = "Producto"

    def __str__ (self):
        return self.productoNombre



class AlmacenModel(models.Model):
    almacenId = models.AutoField(auto_created=True, primary_key=True, unique=True, null=False, db_column='alma_id')
    almacenDescripcion = models.CharField(max_length=75, db_column='alma_desc', verbose_name='Descripcion del almacén', help_text='Aca va la descripcion del almacen')
    almacenEstado = models.BooleanField(db_column='alma_estado', verbose_name='Estado del almacen', null=False, default=True)
    # verbose_name => es el texto que aparecera cuando nos solicite ingresar un valor al campo. Esto se ve en el panel administrativo

    class Meta:
        db_table = 't_almacen'
        verbose_name_plural = "Almacenes"
        verbose_name = "Almacen"

        # verbose_name_plural => es el nombre que aparece debajo del nombre de la aplicacion, en el panel administrativo
        # verbose_name => es el nombre que aparece una vez demos clic sobre el nombre de Almacenes, dentro del panel administrativo
    
    # para que me muestre el nombre del objeto creado en la BD, en el panel administrativo
    def __str__ (self):
        return self.almacenDescripcion



class ProductoAlmacenModel(models.Model):
    productoAlmacenId = models.AutoField(auto_created=True, primary_key=True, unique=True, null=False, db_column='prod_alma_id')
    productoAlmacenCantidad = models.IntegerField(db_column='prod_alma_cant')

    # CASCADE => esta opcion va a permitir eliminar el padre y que cuando se elimine este, automaticamente todos los hijos se eliminen tambien.
    # PROTECT => esta opcion NO va a permitir eliminar el padre, y solamente se va a poder eliminar el padre cuando NO tenga ningun hijo relacionado
    # SET_NULL => permite eliminar al padre, pero cuando este es eliminado, todos sus hijos quedan sin padre, es decir su campo de FK cambia de valor a NULL
    # DO_NOTHING => deja eliminar al padre y no elimina su valor del hijo, es decir se queda con esa llave aunque ya no exista.
    #               Esto genera una mala integridad de los datos y crea errores al momento de devolver segun su padre
    
    # related_name se usa para las relaciones inversas
    productoId = models.ForeignKey(ProductoModel, on_delete=models.PROTECT, db_column='prod_id', related_name='productosAlmacenes')
    almacenId = models.ForeignKey(AlmacenModel, on_delete= models.PROTECT, db_column='alma_id', related_name='almacenesProductos')

    # CAMPOS DE AUDITORIA
    # auto_now_add=True, sirve para que cuando se cree un nuevo registro, se almacene automaticamente la fecha y hora del servidor en esa columna
    # auto_now = True, srive para cuando haya algun cambio en mi registro, se modifique con la fecha actual de mi servidor
    createdAt = models.DateTimeField(db_column='fecCreacion', auto_now_add=True)
    updateAt = models.DateTimeField(db_column='fecActualizacion', auto_now=True)

    class Meta:
        db_table = 't_prod_alma'
        verbose_name_plural = "Productos por almacen"
        verbose_name = "Producto por almacen"

    # def __str__ (self):
    #     return self.productoId.productoNombre + " - "+ self.almacenId.almacenDescripcion



class CabeceraVentaModel(models.Model):
    cabeceraVentaId = models.AutoField(auto_created=True, primary_key=True, unique=True, null=False, db_column='cabven_id')
    cabeceraVentaFecha = models.DateTimeField(db_column='cabven_fecha')
    cabeceraVentaTotal = models.DecimalField(max_digits=5, decimal_places=2, db_column='cabven_total')
    cabeceraVentaNombre = models.CharField(max_length=45, db_column='cabven_nomb')

    class Meta:
        db_table = 't_cabventa'



class DetalleVentaModel(models.Model):
    detalleVentaId = models.AutoField(auto_created=True, primary_key=True, unique=True, null=False, db_column='detven_id')
    detalleVentaCantidad = models.IntegerField(db_column='detven_cant')
    detalleVentaSubTotal = models.DecimalField(max_digits=5, decimal_places=2, db_column='detven_subtotal')
    cabeceraVentaId = models.ForeignKey(CabeceraVentaModel, on_delete=models.PROTECT, db_column='cabven_id', related_name='cabeceraVentas')
    productoId = models.ForeignKey(ProductoModel, on_delete=models.PROTECT, db_column='prod_id', related_name='productoVentas')
    
    class Meta:
        db_table='t_detventa'