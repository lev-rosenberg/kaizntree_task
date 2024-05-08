from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Item(models.Model):
    sku = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    tags = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    in_stock = models.BooleanField()
    available_stock = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items')

    def __str__(self):
        return self.name