from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('academy.urls')),
    path('', include('semesters.urls')),
    path('', include('students.urls')),
    path('', include('teachers.urls')),
    path('', include('courses.urls')),
    path('', include('core.urls')),
    path('', include('form_fill_up.urls')),
]
