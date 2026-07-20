from rest_framework import serializers
from .models import FeeStructure, Invoice, SalarySlip
from users.serializers import StudentProfileSerializer, TeacherProfileSerializer
from curriculum.serializers import ProgramSerializer

class FeeStructureSerializer(serializers.ModelSerializer):
    program_details = ProgramSerializer(source='program', read_only=True)

    class Meta:
        model = FeeStructure
        fields = '__all__'


class InvoiceSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'


class SalarySlipSerializer(serializers.ModelSerializer):
    teacher_details = TeacherProfileSerializer(source='teacher', read_only=True)

    class Meta:
        model = SalarySlip
        fields = '__all__'
