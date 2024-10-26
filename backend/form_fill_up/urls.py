from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FormFillUpViewSet, FormFillUpInformationViewSet, StudentResultsView, YearResultsView

router = DefaultRouter()
router.register(r'form-fill-ups', FormFillUpViewSet, basename='form-fill-up')
router.register(r'form-fill-up-information', FormFillUpInformationViewSet, basename='form-fill-up-information')

urlpatterns = [
    path('', include(router.urls)),
    path('result/', StudentResultsView.as_view(), name='student-results'),
    path('year-results/', YearResultsView.as_view(), name='year-results'),
]
