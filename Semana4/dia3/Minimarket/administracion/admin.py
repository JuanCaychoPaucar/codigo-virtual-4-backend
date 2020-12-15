from django.contrib import admin
from .models import AlmacenModel, ProductoModel, ProductoAlmacenModel

# Register your models here.
admin.site.register(AlmacenModel)
admin.site.register(ProductoModel)
admin.site.register(ProductoAlmacenModel)