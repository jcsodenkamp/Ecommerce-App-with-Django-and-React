from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),
    path('users/profile/', views.getUserProfile, name='users-profile' ),
    path('users/profile/update/', views.updateUserProfile, name='users-profile-update' ),
    path('users/', views.getUsers, name='users'),
    path('products/', views.getProducts, name='products'),
    path('products/<str:pk>', views.getProduct, name='product'),
    path('orders/add/', views.addOrderItems, name='orders-add'),
    path('orders/<str:pk>/', views.getOrderById, name='user-order'),
    re_path('.*', views.index, name='index'),
]


