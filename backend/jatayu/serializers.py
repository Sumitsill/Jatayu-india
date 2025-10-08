from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signup
        fields = ['id', 'full_name', 'email', 'phone', 'password']

    def validate_email(self, value):
        if Signup.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered.")
        return value

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = ['order_id', 'description', 'photo', 'created_at']
        read_only_fields = ['created_at']
