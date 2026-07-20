from django.contrib import admin
from .models import FeeStructure, Invoice, SalarySlip

class FeeStructureAdmin(admin.ModelAdmin):
    list_display = ['program', 'monthly_tuition', 'admission_fee']
    search_fields = ['program__name']

class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['student', 'amount', 'due_date', 'status', 'payment_method', 'paid_at']
    list_filter = ['status', 'payment_method', 'due_date']
    search_fields = ['student__user__username', 'amount']

class SalarySlipAdmin(admin.ModelAdmin):
    list_display = ['teacher', 'month', 'basic_salary', 'bonus', 'deductions', 'is_paid', 'paid_at']
    list_filter = ['is_paid', 'month']
    search_fields = ['teacher__user__username', 'basic_salary']

admin.site.register(FeeStructure, FeeStructureAdmin)
admin.site.register(Invoice, InvoiceAdmin)
admin.site.register(SalarySlip, SalarySlipAdmin)
