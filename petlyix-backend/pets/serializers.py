from rest_framework import serializers
from .models import Pet, Food_Log, Vet_Details
from rest_framework.permissions import IsAuthenticated

class PetSerializer(serializers.ModelSerializer):
    permission_classes = (IsAuthenticated,)
    class Meta:
        model = Pet
        fields = ['name', 'id', 'type', 'breed', 'photo', 'dob']

class FoodLogSerializer(serializers.ModelSerializer):
    permission_classes = (IsAuthenticated,)
    class Meta:
        model = Food_Log
        fields = '__all__'
class VetSerializer(serializers.ModelSerializer):
    permission_classes = (IsAuthenticated,)
    class Meta:
        model = Vet_Details
        fields = '__all__'