from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeeStructureViewSet, InvoiceViewSet, SalarySlipViewSet

router = DefaultRouter()
router.register(r'fees', FeeStructureViewSet, basename='feestructure')
router.register(r'invoices', InvoiceViewSet, basename='invoice')
router.register(r'salaries', SalarySlipViewSet, basename='salaryslip')

urlpatterns = [
    path('', include(router.urls)),
]
