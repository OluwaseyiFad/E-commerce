from rest_framework import routers

from .views import UserProfileViewSet



# routes = routers.SimpleRouter()
routes = routers.DefaultRouter()

routes.register(r'user-profile', UserProfileViewSet, basename='user-profile')


urlpatterns = [
    *routes.urls
]