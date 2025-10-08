from django.db import models

class Signup(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.full_name


class Claim(models.Model):
    order_id = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.ImageField(upload_to='claims/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Claim for Order {self.order_id}"