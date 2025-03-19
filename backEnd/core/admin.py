from django.contrib import admin
from core.models import (
    CustomUser, UserProfile
)
# from import_export.admin  import ImportExportModelAdmin


# Register your models here.

# class CategoryAdmin(ImportExportModelAdmin):
#     pass


admin.site.register(CustomUser)
admin.site.register(UserProfile)

    