from django.urls import path
from .views import ProductosView, ProductoView, AlmacenesView, ProductosAlmacenesView, CabeceraVentasView, VentaView

# debemos declarar este urlpatterns, dentro de nuestro archivo principal urls.py de Minimnarket
# la ruta para probar es: http://127.0.0.1:8000/administracion/productos
urlpatterns = [
    # path(ruta, controlador.as_view()    django agrega el / a la ruta
    path('productos', ProductosView.as_view(), name="Productos"),
    path('producto/<int:id>', ProductoView.as_view()),
    path('almacenes', AlmacenesView.as_view(), name="Almacenes"),
    path('productosalmacenes', ProductosAlmacenesView.as_view(), name="ProductosAlmacenes"),
    path('cabeceraventas', CabeceraVentasView.as_view(), name="CabeceraVentas"),
    path('venta', VentaView.as_view(), name="VentaView"),
]