from rest_framework import routers

from .views import (
    UserProfileViewSet, ProductViewSet, CartViewSet,
    CartItemViewSet, OrderViewSet, OrderItemViewSet
)



# Create a router and register our viewsets with it

routes = routers.DefaultRouter()

routes.register(r'user-profile', UserProfileViewSet, basename='user-profile')
routes.register(r'products', ProductViewSet, basename='products')
routes.register(r'cart', CartViewSet, basename='cart')
routes.register(r'cart-item', CartItemViewSet, basename='cart-item')
routes.register(r'orders', OrderViewSet, basename='order')
routes.register(r'order-item', OrderItemViewSet, basename='order-item')


urlpatterns = [
    *routes.urls
]