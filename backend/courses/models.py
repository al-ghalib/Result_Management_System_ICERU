from django.db import models
from academy.models import Department
from semesters.models import Semester
from teachers.models import Teacher

class Course(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    TYPE_CHOICE = [
        ("Lab", "Lab"),
        ("Theory", "Theory"),
        ("Viva", "Viva"),
        ("Project", "Project"),
        ("Thesis", "Thesis")
    ]

    code = models.BigIntegerField(primary_key=True)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=255, choices=TYPE_CHOICE)
    credit = models.DecimalField(max_digits=3, decimal_places=2)

    def __str__(self) -> str:
        return f'ICE{self.code} - {self.title}'


class Section(models.Model):
    id = models.BigIntegerField(primary_key=True)
    course = models.ForeignKey(Course, models.CASCADE)

    SECTION_CHOICE = [
        ("LAB", "LAB"),
        ("A", "A"),
        ("B", "B")
    ]
    section = models.CharField(max_length=255, choices=SECTION_CHOICE)
    teacher = models.ForeignKey(Teacher, on_delete=models.PROTECT)

    def __str__(self) -> str:
        if self.section == "LAB":
            return f'{self.course}'
        else:
            return f'{self.course} | Section {self.section}'
