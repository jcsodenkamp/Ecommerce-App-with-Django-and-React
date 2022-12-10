from rest_framework import serializers
from django.contrib.auth.models import *
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

