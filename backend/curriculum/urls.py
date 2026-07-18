from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProgramViewSet, CourseViewSet, ClassroomViewSet, TimetableSlotViewSet

router = DefaultRouter()
router.register(r'programs', ProgramViewSet, basename='program')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'classrooms', ClassroomViewSet, basename='classroom')
router.register(r'slots', TimetableSlotViewSet, basename='timetableslot')

urlpatterns = [
    path('', include(router.urls)),
]
