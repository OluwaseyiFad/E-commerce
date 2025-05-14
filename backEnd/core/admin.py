from django.contrib import admin
from core.models import (
    CustomUser, UserProfile, Category, Brand, Product,
    Cart, CartItem, Order, OrderItem, CardDetails
)
from import_export.admin  import ImportExportModelAdmin


# Register your models here.

class CustomUserAdmin(ImportExportModelAdmin):
    pass

class UserProfileAdmin(ImportExportModelAdmin):
    pass

class CategoryAdmin(ImportExportModelAdmin):
    pass

class BrandAdmin(ImportExportModelAdmin):
    pass

class ProductAdmin(admin.ModelAdmin):
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
admin.site.register(Category, CategoryAdmin)
admin.site.register(Brand, BrandAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Cart)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(CardDetails)

