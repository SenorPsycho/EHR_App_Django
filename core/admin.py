from django.contrib import admin
from .models import User, Patient, RetinalImage
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Role Info", {"fields": ("role",)}),
    )
    list_display = ("username", "email", "role", "is_staff")


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ("name", "dob", "gender", "created_at")
    search_fields = ("name",)


@admin.register(RetinalImage)
class RetinalImageAdmin(admin.ModelAdmin):
    list_display = ("patient",)
    search_fields = ("patient__name",)
