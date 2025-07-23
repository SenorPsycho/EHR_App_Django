from rest_framework import serializers
from .models import User, Patient, RetinalImage
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Custom token serializer for login


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the JWT
        token['username'] = user.username
        token['role'] = user.role
        return token

# Default model serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class RetinalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RetinalImage
        fields = '__all__'
