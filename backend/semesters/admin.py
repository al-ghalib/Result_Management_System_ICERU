from django.contrib import admin
from .models import Year, Semester

@admin.register(Year)
class YearAdmin(admin.ModelAdmin):
    list_display = ['year']
    search_fields = ['year']

@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ['id','year', 'name']
    list_filter = ['year', 'name']
    search_fields = ['year__year', 'name']
    ordering = ['year', 'name']
