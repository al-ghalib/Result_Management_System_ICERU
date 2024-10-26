from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email']

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'role', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def validate(self, data):
        return data
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class UseLogInSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    class Meta: 
        model = User
        fields = ['email', 'password']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'role']
        read_only_fields = ['id']

class StudentTeacherIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = None
        fields = ['id']
        