from rest_framework.viewsets import ModelViewSet
from .models import Hall, Department
from .serializers import HallSerializer, DepartmentSerializer

class HallViewSet(ModelViewSet):
    queryset = Hall.objects.all()
    serializer_class = HallSerializer

class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
