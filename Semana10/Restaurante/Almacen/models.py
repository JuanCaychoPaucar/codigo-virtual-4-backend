from django.db import models

# Create your models here.

class InventarioModel(models.Model):
    inventarioId = models.AutoField(
        db_column="inventario_id",
        primary_key=True,
        null=False,
        unique=True
    )

    inventarioPlato = models.CharField(
        db_column="inventario_plato",
        max_length=40,
        null=False,
        verbose_name="Nombre del plato"
    )

    inventarioCantidad = models.IntegerField(
        db_column="inventario_cantidad",
        null=False,
        verbose_name="Cantidad del plato"
    )

    inventarioPrecio = models.DecimalField(
        db_column="inventario_precio",
        decimal_places=2,
        max_digits=5,
        null=False,
        verbose_name="Precio del plato"
    )


    def __str__(self):
        return self.inventarioPlato

    class Meta:
        db_table="t_inventario"
        verbose_name="Inventario"
        verbose_name_plural="Inventarios"