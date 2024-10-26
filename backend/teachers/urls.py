from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeacherViewSet, TeacherCreateView

router = DefaultRouter()
router.register(r'teachers', TeacherViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('teacher/details/', TeacherCreateView.as_view(), name='teacher_details_create'),
]