from rest_framework import serializers
from core.serializers import UserSerializer
from academy.serializers import HallSerializer, DepartmentSerializer
from semesters.serializers import SemesterSerializer
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    hall = HallSerializer()
    department = DepartmentSerializer()
    semester = SemesterSerializer()

    class Meta:
        model = Student
        fields = ['id','user', 'hall', 'department', 'semester', 'id', 'birthdate','reg', 'blood_group', 'university', 'phone_number', 'session'] 


class StudentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'user', 'hall', 'department', 'semester', 
            'id', 'reg', 'blood_group', 'university', 
            'phone_number', 'session', 'birthdate', 'gender'
        ]

    def create(self, validated_data):
        return Student.objects.create(**validated_data)