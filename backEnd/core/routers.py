from rest_framework import routers

from .views import (
    UserProfileViewSet, CategoryViewSet, ProductViewSet, CartViewSet,
    CartItemViewSet
)



# routes = routers.SimpleRouter()
routes = routers.DefaultRouter()

routes.register(r'user-profile', UserProfileViewSet, basename='user-profile')
routes.register(r'category', CategoryViewSet, basename='category')
routes.register(r'product', ProductViewSet, basename='product')
routes.register(r'cart', CartViewSet, basename='cart')
routes.register(r'cart-item', CartItemViewSet, basename='cart-item')


urlpatterns = [
    *routes.urls
]