from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from .serializers import (
    CustomTokenObtainPairSerializer, UserProfileSerializer, UserSerializer,
    CategorySerializer, BrandSerializer, ProductSerializer, CartSerializer, CartItemSerializer,
    OrderSerializer, OrderItemSerializer
    )
from .models import (
    UserProfile, Category, Brand, Product, Cart, CartItem,
    Order, OrderItem, CardDetails
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
    
class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    
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
    
    
    # This action will be called when the user wants to clear their cart
    # It will delete all items in the cart and return a success message
    @action(detail=False, methods=['post'], url_path='clear')
    def clear_cart(self, request):
        cart = Cart.objects.filter(user=request.user).first()
        if not cart:
            return Response({"detail": "No cart found."}, status=status.HTTP_404_NOT_FOUND)
        
        cart.items.all().delete()
        return Response({"detail": "Cart cleared."})

    
class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        cart_item = self.get_object()
        action_type = request.data.get("action")

        if action_type == "increment":
            cart_item.quantity += 1
            cart_item.save()
        elif action_type == "decrement":
            cart_item.quantity -= 1
            if cart_item.quantity <= 0:
                cart_item.delete()
                return self._return_full_cart()
            cart_item.save()
        elif action_type == "remove":
            cart_item.delete()
            return self._return_full_cart()
        else:
            return Response({"detail": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        return self._return_full_cart()

    def create(self, request, *args, **kwargs):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('productId')

        # Check if the product exists
        existing_item = CartItem.objects.filter(cart=cart, product_id=product_id).first()

        # Increment quantity if item exists
        if existing_item:
            existing_item.quantity += 1
            existing_item.save()
        else:
            # Create new cart item if it doesn't exist
            CartItem.objects.create(
                cart=cart,
                product_id=product_id,
                quantity=1,
                color=request.data.get('color'),
                size=request.data.get('size')
            )

        return self._return_full_cart()

    def _return_full_cart(self):
        cart = Cart.objects.filter(user=self.request.user).first()
        if not cart:
            return Response({"items": [], "totalQuantity": 0}, status=status.HTTP_200_OK)

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def perform_destroy(self, instance):
        # Delete the cart item
        instance.delete()
        # Return a response indicating success
        return Response(status=status.HTTP_204_NO_CONTENT)

    
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
  
    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        items = data.pop("items", [])
        card_data = data.pop("card", None)
        payment_method = data.get("payment_method")

        # Create card if card data exists
        card = None
        if payment_method == "card" and card_data:
            card = CardDetails.objects.create(
                card_number=card_data.get("cardNumber"),
                expiry=card_data.get("expiry"),
                cvv=card_data.get("cvv")
            )

        # Create order
        order = Order.objects.create(
            user=request.user,
            shipping_address=data.get("shipping_address"),
            billing_address=data.get("billing_address"),
            payment_method=payment_method,
            card=card,
        )

        # Create order items
        for item in items:
            product_id = item.get("product")
            print("product id", product_id)
            product = Product.objects.get(id=product_id)
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item["quantity"],
                color=item.get("color"),
                size=item.get("size")
            )

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)  
    

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    
        
    