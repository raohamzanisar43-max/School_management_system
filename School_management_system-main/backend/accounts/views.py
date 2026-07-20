from rest_framework import viewsets, permissions
from .models import FeeStructure, Invoice, SalarySlip
from .serializers import FeeStructureSerializer, InvoiceSerializer, SalarySlipSerializer

class FeeStructureViewSet(viewsets.ModelViewSet):
    queryset = FeeStructure.objects.all()
    serializer_class = FeeStructureSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['program']


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student', 'status', 'payment_method', 'due_date']


class SalarySlipViewSet(viewsets.ModelViewSet):
    queryset = SalarySlip.objects.all()
    serializer_class = SalarySlipSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['teacher', 'is_paid', 'month']
