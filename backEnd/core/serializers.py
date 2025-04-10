from djoser.serializers import UserSerializer as BaseUserSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    UserProfile, Category, Product, Cart, CartItem, Order,
    OrderItem
)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
        read_only_fields = ['created_at', 'updated_at']

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'username', 'email', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['is_active', 'created_at', 'updated_at']
        
        
        

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        
class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ['created_at', 'updated_at']

        
class CartItemSerializer(serializers.ModelSerializer):
    # Use a SerializerMethodField to get the product name
    product_name = serializers.CharField(source='product.name', read_only=True)
    # Use a SerializerMethodField to get the product price
    total_price = serializers.SerializerMethodField()
    
    
    class Meta:
        model = CartItem
        fields = ['id', 'product_name', 'quantity', 'total_price', 'color', 'size']
        read_only_fields = ['id', 'product_name', 'quantity', 'color', 'size']
        
    def get_total_price(self, obj):
        return obj.get_total_price()
        
class CartSerializer(serializers.ModelSerializer):
    # Serialize the related CartItems
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'updated_at', 'items', 'total_price']
        read_only_fields = ['created_at', 'updated_at']

    def get_total_price(self, obj):
        return obj.get_total_price()

        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

        