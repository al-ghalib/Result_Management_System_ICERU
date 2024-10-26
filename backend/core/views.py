from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.generics import RetrieveAPIView
from . import serializers, renderers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from .models import User
from students.models import Student
from teachers.models import Teacher

# Create your views here.
# M A N U A L L Y   G E N E R A T E   T O K E N
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    renderer_classes = [renderers.UserRenderer]
    def post(self, request, format=None):
        serializer = serializers.UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response(
            {
                'token':token,
                'msg':'Registration Successful !',
                'user_id': user.id,
            }, 
            status=status.HTTP_201_CREATED
        ) 
    

class UserLogInView(APIView):
    renderer_classes = [renderers.UserRenderer]
    def post(self, request, format=None):
        serializer = serializers.UseLogInSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response(
                    {
                        'token': token,
                        'msg':'LogIn Successful !',
                        'user_id': user.id,
                    }, 
                    status=status.HTTP_200_OK
                )
            else :
                return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
            
class UserProfileView(APIView):
    renderer_classes = [renderers.UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = serializers.UserProfileSerializer(request.user) 
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserProfileSerializer


class StudentTeacherIdView(RetrieveAPIView):
    serializer_class = serializers.StudentTeacherIdSerializer
    renderer_classes = [renderers.UserRenderer]

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        
        try:
            teacher = Teacher.objects.get(user_id=user_id)
            self.serializer_class.Meta.model = Teacher
            return teacher
        except Teacher.DoesNotExist:
            pass

        try:
            student = Student.objects.get(user_id=user_id)
            self.serializer_class.Meta.model = Student
            return student
        except Student.DoesNotExist:
            pass 

        raise NotFound(detail="User with given ID is neither a Teacher nor a Student.")
