from django.db import models
from django.utils import timezone
from semesters.models import Semester 
from students.models import Student
from courses.models import Section
from datetime import timedelta

class FormFillUp(models.Model):
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True, blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Form Fill Up - {self.semester}"

    def save(self, *args, **kwargs):
        if self.end_time <= timezone.now():
            raise ValueError("End time must be in the future.")
        super().save(*args, **kwargs)

    def is_expired(self):
        return timezone.now() > self.end_time
    
    def can_mark(self):
        now = timezone.now()
        return self.end_time < now <= (self.end_time + timedelta(days=90))

    def delete_if_expired(self):
        if self.is_expired():
            self.delete()


class FormFillUpInformation(models.Model):
    form_id = models.ForeignKey(FormFillUp, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

    is_allowed = models.BooleanField(default=False, blank=True)
    is_formed = models.BooleanField(default=False, blank=True)
    is_added = models.BooleanField(default=False, blank=True)

    final_marks = models.DecimalField(default=0.0, max_digits=10, decimal_places=2, null=True, blank=True)
    ct_marks = models.DecimalField(default=0.0, max_digits=10, decimal_places=2, null=True, blank=True)
    attend_marks = models.DecimalField(default=0.0, max_digits=10, decimal_places=2, null=True, blank=True)

    is_marks_added = models.BooleanField(default=False, blank=True)
    is_result = models.BooleanField(default=False, blank=True)

    class Meta:
        unique_together = ('form_id', 'student', 'section')

    def __str__(self):
        return f"{self.form_id} - {self.student} - {self.section}"