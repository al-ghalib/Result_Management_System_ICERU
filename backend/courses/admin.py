from django.contrib import admin
from .models import Course, Section

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'title', 'department', 'semester', 'type', 'credit')
    list_filter = ('department', 'semester', 'type')
    search_fields = ('code', 'title', 'type')
    ordering = ('code',)

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('course', 'section', 'teacher')
    list_filter = ('course__department', 'course__semester', 'section')
    search_fields = ('course__title', 'section', 'teacher__user__first_name', 'teacher__user__last_name')
    ordering = ('course',)

