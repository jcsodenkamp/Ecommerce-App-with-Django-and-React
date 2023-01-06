from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index),
    # users 
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),
    path('users/profile/', views.getUserProfile, name='users-profile' ),
    path('users/profile/update/', views.updateUserProfile, name='users-profile-update' ),
    path('users/', views.getUsers, name='users'),
    path('users/update/<str:pk>/', views.updateUser, name='users-update'),
    path('users/<str:pk>/', views.getUsersById, name='user'),
    path('users/delete/<str:pk>/', views.deleteUser, name='user-delete'),

    # products 
    path('products/', views.getProducts, name='products'),
    path('products/create/', views.createProduct, name='product-create'),
    path('products/upload/', views.uploadImage, name='image-upload'),
    path('products/<str:pk>/', views.getProduct, name='product'),
    path('products/update/<str:pk>/', views.updateProduct, name='product-update'),
    path('products/delete/<str:pk>/', views.deleteProduct, name='product-delete'),
    path('products/<str:pk>/reviews/', views.createProductReview, name='create-review'),
    
    # orders
    path('orders/add/', views.addOrderItems, name='orders-add'),
    path('orders/allorders/', views.getOrders, name='orders-allorders'),
    path('orders/myorders/', views.getMyOrders, name='myorders'),
    path('orders/<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),
    path('orders/<str:pk>/', views.getOrderById, name='user-order'),
    path('orders/<str:pk>/pay/', views.updateOrderToPaid, name='pay'),

    # re_path('.*', views.index, name='index'),
]


