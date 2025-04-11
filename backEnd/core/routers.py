from rest_framework import routers

from .views import (
    UserProfileViewSet, CategoryViewSet, ProductViewSet, CartViewSet,
    CartItemViewSet, OrderViewSet, OrderItemViewSet, BrandViewSet
)



# routes = routers.SimpleRouter()
routes = routers.DefaultRouter()

routes.register(r'user-profile', UserProfileViewSet, basename='user-profile')
routes.register(r'category', CategoryViewSet, basename='category')
routes.register(r'brand', BrandViewSet, basename='brand')
routes.register(r'products', ProductViewSet, basename='products')
routes.register(r'cart', CartViewSet, basename='cart')
routes.register(r'cart-item', CartItemViewSet, basename='cart-item')
routes.register(r'order', OrderViewSet, basename='order')
routes.register(r'order-item', OrderItemViewSet, basename='order-item')


urlpatterns = [
    *routes.urls
]