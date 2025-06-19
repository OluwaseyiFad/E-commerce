from django import forms
from .models import Product
import json

class ProductAdminForm(forms.ModelForm):
    STORAGE_OPTIONS = {"64GB", "128GB", "256GB", "512GB", "1TB"}
    COLOR_OPTIONS = {"Black", "White", "Silver", "Gold", "Blue"}

    class Meta:
        model = Product
        fields = '__all__'
        help_texts = {
            'storage': 'Enter a JSON list like: [{"size": "128GB", "in_stock": true}]. Allowed sizes: 64GB, 128GB, 256GB, 512GB, 1TB',
            'colors': 'Enter a JSON list like: [{"color": "Black", "in_stock": true}]. Allowed colors: Black, White, Silver, Gold, Blue',
        }

    def clean_storage(self):
        raw_value = self.cleaned_data.get('storage')
        if isinstance(raw_value, str):
            try:
                value = json.loads(raw_value)
            except Exception:
                raise forms.ValidationError('Invalid JSON format. Example: [{"size": "128GB", "in_stock": true}]')
        else:
            value = raw_value

        if not isinstance(value, list):
            raise forms.ValidationError("Storage must be a list.")

        for item in value:
            if not isinstance(item, dict):
                raise forms.ValidationError("Each item must be a dictionary with keys 'size' and 'in_stock'.")
            if "size" not in item or "in_stock" not in item:
                raise forms.ValidationError("Missing 'size' or 'in_stock' in one or more items.")
            if item["size"] not in self.STORAGE_OPTIONS:
                raise forms.ValidationError(f"Invalid size: '{item['size']}'. Allowed: {sorted(self.STORAGE_OPTIONS)}")
            if not isinstance(item["in_stock"], bool):
                raise forms.ValidationError(f"'in_stock' must be true or false for size '{item['size']}'.")

        return value

    def clean_colors(self):
        raw_value = self.cleaned_data.get('colors')
        if isinstance(raw_value, str):
            try:
                value = json.loads(raw_value)
            except Exception:
                raise forms.ValidationError('Invalid JSON format. Example: [{"color": "Black", "in_stock": true}]')
        else:
            value = raw_value

        if not isinstance(value, list):
            raise forms.ValidationError("Colors must be a list.")

        for item in value:
            if not isinstance(item, dict):
                raise forms.ValidationError("Each item must be a dictionary with keys 'color' and 'in_stock'.")
            if "color" not in item or "in_stock" not in item:
                raise forms.ValidationError("Missing 'color' or 'in_stock' in one or more items.")
            if item["color"] not in self.COLOR_OPTIONS:
                raise forms.ValidationError(f"Invalid color: '{item['color']}'. Allowed: {sorted(self.COLOR_OPTIONS)}")
            if not isinstance(item["in_stock"], bool):
                raise forms.ValidationError(f"'in_stock' must be true or false for color '{item['color']}'.")

        return value
