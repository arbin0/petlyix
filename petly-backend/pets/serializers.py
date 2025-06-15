from rest_framework import serializers
from .models import Pet, Food_Log

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'

class FoodLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food_Log
        fields = '__all__'