# views.py
from rest_framework.viewsets import ModelViewSet
from .models import Course, Section
from .serializers import CourseSerializer, SectionSerializer

class CourseViewSet(ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class SectionViewSet(ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
