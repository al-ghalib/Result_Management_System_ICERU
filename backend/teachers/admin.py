from django.contrib import admin
from .models import Teacher

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'user', 
        'user_name',
        'user_email',
        'department', 
        'id', 
        'blood_group', 
        'university', 
        'phone_number',
        'birthdate'
    )
    search_fields = ('user__name', 'department__name')
    list_filter = ('department', 'blood_group')
    ordering = ('id',)
    
    def user_name(self, obj):
        return obj.user.name
    user_name.short_description = 'Full Name'

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'Email'
