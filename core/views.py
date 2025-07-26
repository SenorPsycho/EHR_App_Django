from .serializers import PatientSerializer
from .models import Patient
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import User, Patient, RetinalImage
from .serializers import (
    UserSerializer,
    PatientSerializer,
    RetinalImageSerializer,
    CustomTokenObtainPairSerializer
)
from rest_framework_simplejwt.views import TokenObtainPairView

# Custom login view


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Model viewsets


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class RetinalImageViewSet(viewsets.ModelViewSet):
    queryset = RetinalImage.objects.all()
    serializer_class = RetinalImageSerializer


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]


class IsDoctorOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role == 'doctor'


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsDoctorOrReadOnly]
