from rest_framework import routers

from .views import UserProfileViewSet, CategoryViewSet



# routes = routers.SimpleRouter()
routes = routers.DefaultRouter()

routes.register(r'user-profile', UserProfileViewSet, basename='user-profile')
routes.register(r'category', CategoryViewSet, basename='category')


urlpatterns = [
    *routes.urls
]