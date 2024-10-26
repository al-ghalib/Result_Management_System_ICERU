from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user', 
        'user_name',
        'birthdate',
        'hall', 
        'department', 
        'semester',
        'reg', 
        'blood_group', 
        'university', 
        'phone_number', 
        'session'
    )
    list_filter = ['hall', 'department', 'semester', 'blood_group']
    search_fields = ['user__email', 'user__name', 'id', 'reg', 'session']
    ordering = ['user__email']

    def user_name(self, obj):
        return obj.user.name
    user_name.short_description = 'Full Name'