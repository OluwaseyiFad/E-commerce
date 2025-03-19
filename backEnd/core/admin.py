from django.contrib import admin
from core.models import (
    CustomUser, UserProfile, Category, Product,
    Cart, CartItem
)
from import_export.admin  import ImportExportModelAdmin


# Register your models here.

class CustomUserAdmin(ImportExportModelAdmin):
    pass

class UserProfileAdmin(ImportExportModelAdmin):
    pass

class CategoryAdmin(ImportExportModelAdmin):
    pass

class ProductAdmin(ImportExportModelAdmin):
    pass

class CartItemAdmin(ImportExportModelAdmin):
    pass


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Cart)
admin.site.register(CartItem, CartItemAdmin)

    