from rest_framework import viewsets, generics
from .models import Student
from .serializers import StudentSerializer, StudentCreateSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.select_related('user').all()
    serializer_class = StudentSerializer

class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentCreateSerializer