# Generated by Django 3.1.6 on 2021-02-08 12:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Facturacion', '0003_auto_20210207_1446'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detallecomandamodel',
            name='cabecera',
            field=models.ForeignKey(db_column='cabecera_id', on_delete=django.db.models.deletion.PROTECT, related_name='cabeceraDetalles', to='Facturacion.cabeceracomandamodel', verbose_name='Cabecera'),
        ),
    ]