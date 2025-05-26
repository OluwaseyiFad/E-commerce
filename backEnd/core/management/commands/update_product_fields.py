from django.core.management.base import BaseCommand
from core.models import Product  # Import your Product model

class Command(BaseCommand):
    help = 'Programmatically update storage and colors for phones, tablets, and iPads.'

    def handle(self, *args, **kwargs):
        # Define lists of storage sizes and colors
        storage_sizes = [
            {"size": "64GB", "in_stock": True},
            {"size": "128GB", "in_stock": True},
            {"size": "256GB", "in_stock": False},
            {"size": "512GB", "in_stock": True},
            {"size": "1TB", "in_stock": False}
        ]

        colors_list = [
            {"color": "Black", "in_stock": True},
            {"color": "White", "in_stock": False},
            {"color": "Silver", "in_stock": True},
            {"color": "Gold", "in_stock": True},
            {"color": "Blue", "in_stock": True}
        ]

        # Loop through all products and add storage/colors if the product is a phone, tablet, or iPad
        updated_count = 0

        # Update phones, tablets, and iPads (skip others)
        for product in Product.objects.all():
            # Check if the product is a phone, tablet, or iPad based on category
            print(product.category.id)
            if product.category.id in [1, 2, 3, 4]:  # Assuming these categories are for phones, tablets, and iPads
                # Add storage and colors if the product doesn't already have them
                product.storage = storage_sizes  # Assigning first three sizes for all phones/tablets
                product.colors = colors_list  # Assigning first three colors for all phones/tablets
                
                product.save()
                updated_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully updated {updated_count} phones, tablets, and iPads.'))
