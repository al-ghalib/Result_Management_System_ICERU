from django.contrib import admin
from .models import FormFillUp, FormFillUpInformation

@admin.register(FormFillUp)
class FormFillUpAdmin(admin.ModelAdmin):
    # Displaying fields in the list view
    list_display = ('semester', 'title', 'start_time', 'end_time', 'is_expired')
    
    # Fields to search by
    search_fields = ('semester__name', 'title')
    
    # Filtering options
    list_filter = ('semester', 'start_time', 'end_time')
    fieldsets = (
        (None, {
            'fields': ('semester', 'title', 'description')
        }),
        ('Time Information', {
            'fields': ('start_time', 'end_time'),
        }),
    )

    # Adding actions to delete expired records
    actions = ['delete_expired_forms']

    # Action method to delete expired forms
    def delete_expired_forms(self, request, queryset):
        for form in queryset:
            form.delete_if_expired()
        self.message_user(request, "Expired forms have been deleted successfully.")
    delete_expired_forms.short_description = "Delete expired forms"

@admin.register(FormFillUpInformation)
class FormFillUpInformationAdmin(admin.ModelAdmin):
    # Displaying fields in the list view
    list_display = ('form_id', 'student', 'section', 'is_allowed', 'is_formed', 'is_added', 'final_marks', 'is_marks_added', 'is_result')
    
    # Fields to search by
    search_fields = ('form_id__title', 'student__name', 'section__name')
    
    # Filtering options
    list_filter = ('is_allowed', 'is_formed', 'is_added', 'is_marks_added', 'is_result')
    
    # Inline editing of boolean fields
    list_editable = ('is_allowed', 'is_formed', 'is_added', 'is_marks_added', 'is_result')

    # Customize form layout for better organization
    fieldsets = (
        (None, {
            'fields': ('form_id', 'student', 'section')
        }),
        ('Permissions', {
            'fields': ('is_allowed', 'is_formed', 'is_added'),
        }),
        ('Marks', {
            'fields': ('final_marks', 'ct_marks', 'attend_marks', 'is_marks_added'),
        }),
        ('Result', {
            'fields': ('is_result',),
        }),
    )
    
    # Enforcing unique constraint on form_id, student, and section combination
    def save_model(self, request, obj, form, change):
        if not change:  # Only enforce on new records
            if FormFillUpInformation.objects.filter(form_id=obj.form_id, student=obj.student, section=obj.section).exists():
                self.message_user(request, "This FormFillUpInformation entry already exists.")
                return
        super().save_model(request, obj, form, change)
