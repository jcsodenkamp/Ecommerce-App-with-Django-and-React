from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),

    path('api/', views.getRoutes, name='routes'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('products/', views.getProducts, name='products'),
    path('products/<str:pk>', views.getProduct, name='product'),
]
