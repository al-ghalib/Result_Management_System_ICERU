from django.db import models
from core.models import User
from academy.models import Department

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    id = models.BigIntegerField(primary_key=True)

    BLOOD_GROUP_CHOICE = [
        ('A+', 'A+'),
        ('B+', 'B+'),
        ('AB+', 'AB+'),
        ('O+', 'O+'),
        ('A-', 'A-'),
        ('B-', 'B-'),
        ('AB-', 'AB-'),
        ('O-', 'O-'),
    ]
    blood_group = models.CharField(max_length=10, choices=BLOOD_GROUP_CHOICE)
    university = models.CharField(max_length=255, default='University of Rajshahi')
    phone_number = models.CharField(max_length=255, null=True, blank=True)
    birthdate = models.DateField()

    rank = models.CharField(max_length=255, default="Lecturer")

    GENDER_CHOICE = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other")
    ]
    gender = models.CharField(max_length=255, choices=GENDER_CHOICE, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.user.name}'


