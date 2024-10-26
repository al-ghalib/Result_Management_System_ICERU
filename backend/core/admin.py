from django.contrib import admin
from .models import User, Role

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'role', 'is_active', 'is_admin')
    list_filter = ('is_active', 'is_admin')
    search_fields = ('email', 'name')
    ordering = ('email',)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ['name']