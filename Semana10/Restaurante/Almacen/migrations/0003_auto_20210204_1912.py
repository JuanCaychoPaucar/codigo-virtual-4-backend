# Generated by Django 3.1.6 on 2021-02-04 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Almacen', '0002_auto_20210204_1911'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventariomodel',
            name='inventarioPlato',
            field=models.CharField(db_column='inventario_plato', default=None, max_length=40, verbose_name='Nombre del plato'),
            preserve_default=False,
        ),
    ]