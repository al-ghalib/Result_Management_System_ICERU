from rest_framework import viewsets
from rest_framework.views import APIView
from django.db.models import Sum, F
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import ValidationError
from .models import FormFillUp, FormFillUpInformation
from .serializers import FormFillUpSerializer, FormFillUpInformationSerializer, CourseResultSerializer
from .renderers import CustomErrorRenderer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from decimal import Decimal

class FormFillUpViewSet(viewsets.ModelViewSet):
    queryset = FormFillUp.objects.all()
    serializer_class = FormFillUpSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        if instance.is_expired():
            instance.delete()
        else:
            raise ValidationError("Cannot delete as the end time has not expired.")

class StudentResultsView(APIView):
    def get(self, request):
        student_id = request.query_params.get('studentId')
        semester_id = request.query_params.get('semesterId')

        if not student_id:
            return Response({"error": "studentId parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student_id = int(student_id)
            semester_id = int(semester_id) if semester_id else None
        except ValueError:
            return Response({"error": "Invalid studentId or semesterId."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch results based on provided semesterId or all semesters for CGPA
        if semester_id and semester_id != 0:
            results = FormFillUpInformation.objects.filter(student=student_id, form_id__semester=semester_id)
        else:
            results = FormFillUpInformation.objects.filter(student=student_id)

        if not results.exists():
            return Response({"message": "No results found for the specified parameters."}, status=status.HTTP_404_NOT_FOUND)

        # Dictionary to aggregate marks by course
        course_aggregates = {}

        for result in results:
            course_code = result.section.course.code
            course_title = result.section.course.title
            course_credit = result.section.course.credit
            total_marks = result.final_marks + result.ct_marks + result.attend_marks

            if course_code not in course_aggregates:
                course_aggregates[course_code] = {
                    'course_code': course_code,
                    'course_title': course_title,
                    'total_marks': Decimal(0),
                    'total_credits': Decimal(0)
                }

            course_aggregates[course_code]['total_marks'] += total_marks
            course_aggregates[course_code]['total_credits'] = course_credit

        print(course_aggregates)

        # Convert the aggregated data into a list for serialization
        aggregated_results = [
            {
                'course_code': agg['course_code'],
                'course_title': agg['course_title'],
                'total_marks': float(agg['total_marks']),
                'total_credits': float(agg['total_credits']),
                'gpa_points': self.calculate_gpa(float(agg['total_marks']), float(agg['total_credits']))
            }
            for agg in course_aggregates.values()
        ]

        # Calculate overall GPA/CGPA
        total_credits = sum([agg['total_credits'] for agg in aggregated_results])
        weighted_gpa_sum = sum([agg['gpa_points'] * agg['total_credits'] for agg in aggregated_results])

        if total_credits > 0:
            gpa = weighted_gpa_sum / total_credits
        else:
            gpa = Decimal(0)

        response_data = {
            "results": aggregated_results,
            "GPA" if semester_id and semester_id != 0 else "CGPA": round(gpa, 2)
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def calculate_gpa(self, total_marks, total_credits):
        #print(total_marks)
        total_marks = float((total_marks / (total_credits*25))*100)
        #print(total_marks, total_credits)
        if total_marks >= 80:
            return 4.0  # A+
        elif total_marks >= 75:
            return 3.75  # A
        elif total_marks >= 70:
            return 3.5  # A-
        elif total_marks >= 65:
            return 3.25  # B+
        elif total_marks >= 60:
            return 3.0  # B
        elif total_marks >= 55:
            return 2.75  # B-
        elif total_marks >= 50:
            return 2.5  # C+
        elif total_marks >= 45:
            return 2.25  # C
        elif total_marks >= 40:
            return 2.0  # D
        else:
            return 0.0  # F or Incomplete

class FormFillUpInformationViewSet(viewsets.ModelViewSet):
    queryset = FormFillUpInformation.objects.all()
    serializer_class = FormFillUpInformationSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'patch', 'post']


from django.db.models import Sum, F
from .models import FormFillUpInformation, Semester
from .serializers import YearResultSerializer

class YearResultsView(APIView):
    def get(self, request):
        student_id = request.query_params.get('studentId')
        year_id = request.query_params.get('yearId')

        if not student_id or not year_id:
            return Response({"error": "Both yearId and studentId parameters are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student_id = int(student_id)
            year_id = int(year_id)
        except ValueError:
            return Response({"error": "Invalid yearId or studentId."}, status=status.HTTP_400_BAD_REQUEST)

        # Filter FormFillUpInformation entries for the given student and year
        results = FormFillUpInformation.objects.filter(
            student=student_id,
            form_id__semester__year=year_id
        ).select_related('section__course')
        print(student_id, year_id, results)

        if not results.exists():
            return Response({"message": "No results found for the specified parameters."}, status=status.HTTP_404_NOT_FOUND)

        # Dictionary to aggregate marks by course
        course_aggregates = {}

        for result in results:
            course_code = result.section.course.code
            course_title = result.section.course.title
            course_credit = result.section.course.credit
            total_marks = result.final_marks + result.ct_marks + result.attend_marks

            if course_code not in course_aggregates:
                course_aggregates[course_code] = {
                    'course_code': course_code,
                    'course_title': course_title,
                    'total_marks': Decimal(0),
                    'total_credits': Decimal(0)
                }

            course_aggregates[course_code]['total_marks'] += total_marks
            course_aggregates[course_code]['total_credits'] = course_credit

        # Aggregate data for serialization
        aggregated_results = [
            {
                'course_code': agg['course_code'],
                'course_title': agg['course_title'],
                'total_marks': float(agg['total_marks']),
                'total_credits': float(agg['total_credits']),
                'gpa_points': self.calculate_gpa(float(agg['total_marks']), float(agg['total_credits']))
            }
            for agg in course_aggregates.values()
        ]

        # Calculate overall GPA
        total_credits = sum([agg['total_credits'] for agg in aggregated_results])
        weighted_gpa_sum = sum([agg['gpa_points'] * agg['total_credits'] for agg in aggregated_results])

        if total_credits > 0:
            gpa = weighted_gpa_sum / total_credits
        else:
            gpa = Decimal(0)

        response_data = {
            "results": aggregated_results,
            "GPA": round(gpa, 2)
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def calculate_gpa(self, total_marks, total_credits):
        # GPA calculation based on marks percentage
        percentage = (total_marks / (total_credits * 25)) * 100
        if percentage >= 80:
            return 4.0  # A+
        elif percentage >= 75:
            return 3.75  # A
        elif percentage >= 70:
            return 3.5  # A-
        elif percentage >= 65:
            return 3.25  # B+
        elif percentage >= 60:
            return 3.0  # B
        elif percentage >= 55:
            return 2.75  # B-
        elif percentage >= 50:
            return 2.5  # C+
        elif percentage >= 45:
            return 2.25  # C
        elif percentage >= 40:
            return 2.0  # D
        else:
            return 0.0  # F or Incomplete
