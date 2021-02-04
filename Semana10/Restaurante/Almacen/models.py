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
        null=True,
        verbose_name="Nombre del plato"
    )

    inventarioCantidad = models.IntegerField(
        db_column="inventario_cantidad",
        null=True,
        verbose_name="Cantidad del plato"
    )

    def __str__(self):
        return self.inventarioPlato

    class Meta:
        db_table="t_inventario"
        verbose_name="Inventario"
        verbose_name_plural="Inventarios"