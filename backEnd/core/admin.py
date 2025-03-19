from django.contrib import admin
from core.models import (
    CustomUser, UserProfile, Category, Product
)
from import_export.admin  import ImportExportModelAdmin


# Register your models here.

class CategoryAdmin(ImportExportModelAdmin):
    pass

class ProductAdmin(ImportExportModelAdmin):
    pass


admin.site.register(CustomUser)
admin.site.register(UserProfile)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)

    