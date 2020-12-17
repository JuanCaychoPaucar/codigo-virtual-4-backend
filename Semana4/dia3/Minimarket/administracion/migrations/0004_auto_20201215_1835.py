# Generated by Django 3.1.4 on 2020-12-15 23:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administracion', '0003_productomodel_productoestado'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productoalmacenmodel',
            old_name='almacenID',
            new_name='almacenId',
        ),
        migrations.RenameField(
            model_name='productoalmacenmodel',
            old_name='productoAlmacenID',
            new_name='productoAlmacenId',
        ),
        migrations.AddField(
            model_name='almacenmodel',
            name='almacenEstado',
            field=models.BooleanField(db_column='alma_estado', default=True, verbose_name='Estado del almacen'),
        ),
    ]