from django.db import models

class Year(models.Model):
    year = models.BigIntegerField(primary_key=True)

    def __str__(self) -> str:
        if self.year == 1:
            return '1st'
        elif self.year == 2:
            return '2nd'
        elif self.year == 3:
            return '3rd'
        else:
            return '4th'

class Semester(models.Model):
    SEM_COICE = [
        ("Odd","Odd"),
        ("Even", "Even")
    ] 
    id = models.BigIntegerField(primary_key=True)
    year = models.ForeignKey(Year,on_delete=models.CASCADE)
    name = models.CharField(max_length=255, choices=SEM_COICE)

    def __str__(self) -> str:
        return f'{self.year} Year {self.name} Semester'