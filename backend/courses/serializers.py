from rest_framework import serializers
from academy.serializers import DepartmentSerializer
from semesters.serializers import SemesterSerializer
from .models import Course, Section
from academy.models import Department
from semesters.models import Semester
from teachers.models import Teacher
from core.serializers import UserSerializer

class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer();
    class Meta:
        model = Teacher
        fields = ['id', 'user']

class SectionDetailSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)  # Nested Teacher details

    class Meta:
        model = Section
        fields = ['id', 'section', 'teacher']

class CourseSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    semester = SemesterSerializer(read_only=True)
    sections = SectionDetailSerializer(many=True, read_only=True, source='section_set')
    
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), write_only=True, source='department'
    )
    semester_id = serializers.PrimaryKeyRelatedField(
        queryset=Semester.objects.all(), write_only=True, source='semester'
    )

    class Meta:
        model = Course
        fields = [
            'code', 'title', 'department', 'semester', 'type', 
            'credit', 'sections', 'department_id', 'semester_id'
        ]
        extra_kwargs = {
            'department': {'required': False},
            'semester': {'required': False}
        }

    def create(self, validated_data):
        department = validated_data.pop('department')
        semester = validated_data.pop('semester')
        return Course.objects.create(department=department, semester=semester, **validated_data)




class SectionSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(), write_only=True, source='course'
    )

    class Meta:
        model = Section
        fields = ['id', 'course', 'section', 'teacher', 'course_id']
        extra_kwargs = {
            'course': {'required': False}
        }

    def create(self, validated_data):
        course = validated_data.pop('course')
        return Section.objects.create(course=course, **validated_data)
