from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, StudentCreateView

router = DefaultRouter()
router.register(r'students', StudentViewSet)

urlpatterns = [
    path('', include(router.urls)),
     path('student/details/', StudentCreateView.as_view(), name='student_details_create'),
]