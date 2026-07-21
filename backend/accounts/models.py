from django.db import models
from users.models import StudentProfile, TeacherProfile
from curriculum.models import Program

class FeeStructure(models.Model):
    program = models.OneToOneField(Program, on_delete=models.CASCADE, related_name='fee_structure')
    monthly_tuition = models.DecimalField(max_digits=10, decimal_places=2)
    admission_fee = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Fee: {self.program.get_name_display()}"


class Invoice(models.Model):
    STATUS_CHOICES = (
        ('PAID', 'Paid'),
        ('UNPAID', 'Unpaid'),
        ('OVERDUE', 'Overdue'),
    )
    PAYMENT_METHOD_CHOICES = (
        ('BANK_TRANSFER', 'Bank Transfer'),
        ('CREDIT_CARD', 'Credit / Debit Card'),
        ('CASH', 'Cash'),
        ('PENDING', 'Pending Payment'),
    )
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='invoices')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='UNPAID')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='PENDING')
    paid_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Invoice {self.id} for {self.student.user.username} - Amount: {self.amount} ({self.get_status_display()})"


class SalarySlip(models.Model):
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, related_name='salary_slips')
    month = models.DateField(help_text="The first day of the pay month, e.g. 2026-07-01")
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('teacher', 'month')

    def __str__(self):
        return f"Salary Slip {self.month.strftime('%B %Y')} - {self.teacher.user.username} - Net: {self.basic_salary + self.bonus - self.deductions}"
