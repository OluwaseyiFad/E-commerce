from django.contrib import admin
from import_export.admin  import ImportExportModelAdmin
from core.models import (
    CustomUser, UserProfile, Product,
    Cart, CartItem, Order, OrderItem, CardDetails
)
from core.forms import ProductAdminForm


# Register your models here.

# Custom admin classes for each model

class CustomUserAdmin(ImportExportModelAdmin):
    pass

class UserProfileAdmin(ImportExportModelAdmin):
    pass


class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    list_display = ['name', 'brand', 'price', 'stock', 'category']
    search_fields = ['name', 'brand']
    list_filter = ['category']


class CartItemAdmin(ImportExportModelAdmin):
    pass

class OrderAdmin(ImportExportModelAdmin):
    pass

class OrderItemAdmin(ImportExportModelAdmin):
    pass


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Cart)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(CardDetails)

