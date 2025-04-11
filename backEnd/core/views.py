from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from .serializers import (
    CustomTokenObtainPairSerializer, UserProfileSerializer, UserSerializer,
    CategorySerializer, ProductSerializer, CartSerializer, CartItemSerializer,
    OrderSerializer, OrderItemSerializer
    )
from .models import (
    UserProfile, Category, Product, Cart, CartItem,
    Order, OrderItem
    )

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return self.queryset.filter(user=user)
        return self.queryset.none()  
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)

    
    
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Get the cart for the authenticated user
        cart = Cart.objects.filter(user=self.request.user).first()

        if not cart:
            return Cart.objects.none()
        
        return [cart]  # Return the cart object in a list

    def list(self, request, *args, **kwargs):
        # Get the cart for the authenticated user
        cart = Cart.objects.filter(user=request.user).first()

        if not cart:
            return Response({"detail": "No cart found for this user"}, status=404)

        # Serialize the cart using the CartSerializer
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    
class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        cart_item = self.get_object()
        action_type = request.data.get("action")  # 'increment' or 'decrement'

        if action_type == "increment":
            cart_item.quantity += 1
            cart_item.save()
        elif action_type == "decrement":
            cart_item.quantity -= 1
            if cart_item.quantity <= 0:
                cart_item.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            cart_item.save()
        elif action_type == "remove":
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data)
    
    def create(self, serializer):
        cart = Cart.objects.filter(user=self.request.user).first()
        if not cart:
            cart = Cart.objects.create(user=self.request.user)

        product_id = self.request.data.get('productId')
        # Check if the product exists
        existing_item = CartItem.objects.filter(cart=cart, product_id=product_id).first()

        # If the product already exists in the cart, increment the quantity
        if existing_item:
            print("existing item found")
            existing_item.quantity += 1
            existing_item.save()
            serializer = self.get_serializer(existing_item)
            return Response(serializer.data, status=status.HTTP_200_OK)

        print("existing item not found")
        # If the product does not exist, create a new cart item
        new_item = CartItem.objects.create(
            cart=cart,
            product_id=product_id,
            quantity=1,
            color=self.request.data.get('color'),
            size=self.request.data.get('size')
        )
        serializer = self.get_serializer(new_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
    def perform_destroy(self, instance):
        # Delete the cart item
        instance.delete()
        # Return a response indicating success
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
    
    

    
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    
        
    