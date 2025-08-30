from rest_framework import serializers
from .models import Pet, Food_Log, Vet_Details


class PetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pet
        fields = ['name', 'id', 'type', 'breed', 'photo', 'dob', 'ownerId']

class FoodLogSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Food_Log
        fields = '__all__'
class VetSerializer(serializers.ModelSerializer):
    
    pets = serializers.PrimaryKeyRelatedField(
        many=True,  # because a vet can have multiple pets
        queryset=Pet.objects.all(),
        required=False  # optional
    )

    class Meta:
        model = Vet_Details
        fields = '__all__'