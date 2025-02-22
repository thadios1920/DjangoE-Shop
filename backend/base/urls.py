from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path( '',views.getRoute ,name= 'routes' ),
    path( 'products/',views.getProducts ,name= 'products' ),
    path( 'products/<str:pk>',views.getProduct ,name= 'product' )
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
