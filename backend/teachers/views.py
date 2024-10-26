from rest_framework import viewsets, generics
from .models import Teacher
from .serializers import TeacherWithAssignedCourseSerializer, TeacherCreateSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.select_related('user').all()
    serializer_class = TeacherWithAssignedCourseSerializer


class TeacherCreateView(generics.CreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherCreateSerializer