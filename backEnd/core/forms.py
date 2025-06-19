from django import forms
from .models import Product
import json

class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

        help_texts = {
            'storage': 'Enter storage options as a JSON list. Example: ["128GB", "256GB"]',
            'colors': 'Enter color options as a JSON list. Example: ["Black", "White"]',
        }

    def clean_storage(self):
        value = self.cleaned_data.get('storage')
        if isinstance(value, str):
            try:
                parsed = json.loads(value)
                if not isinstance(parsed, list):
                    raise forms.ValidationError("Must be a JSON list.")
                return parsed
            except Exception:
                raise forms.ValidationError('Enter a valid JSON list like: ["128GB", "256GB"]')
        return value

    def clean_colors(self):
        value = self.cleaned_data.get('colors')
        if isinstance(value, str):
            try:
                parsed = json.loads(value)
                if not isinstance(parsed, list):
                    raise forms.ValidationError("Must be a JSON list.")
                return parsed
            except Exception:
                raise forms.ValidationError('Enter a valid JSON list like: ["Black", "White"]')
        return value
