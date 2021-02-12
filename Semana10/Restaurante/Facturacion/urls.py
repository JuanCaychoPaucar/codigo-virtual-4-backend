from django.urls import path
from .views import (
    RegistroUsuarioView,
    MesasView,
    CustomPayloadView,
    ComandasView,
    CrearPedidoView,
    GenerarNotaPedidoView,
    CierreDiaView,
    GenerarComprobantePago,
    mesas_disponibles,
    crear_pedido
)

# valida las credenciales y si estas son correctas me retornara la JWT
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('registro', RegistroUsuarioView.as_view()),
    # path('login', TokenObtainPairView.as_view()),
    path('login', CustomPayloadView.as_view()),
    path('mesa', MesasView.as_view()),
    path('mesasDisponibles', mesas_disponibles),
    path('comanda', ComandasView.as_view()),
    path('crearPedido', CrearPedidoView.as_view()),
    path('crearPedidoDeprecated', crear_pedido),
    path('notaPedido/<int:id_comanda>', GenerarNotaPedidoView.as_view()),
    path('comprobante/<int:id_comanda>', GenerarComprobantePago.as_view()),
    path('cierreDia', CierreDiaView.as_view())
]


# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html
# pip install djangorestframework-simplejwt
