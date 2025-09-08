from rest_framework import serializers
from .models import Pet, Food_Log, Vet_Details, VetVisit, Appointment, PetHealth


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
class VetVisitSerializer(serializers.ModelSerializer):
    pet = serializers.PrimaryKeyRelatedField(queryset=Pet.objects.all())
    vet = serializers.PrimaryKeyRelatedField(queryset=Vet_Details.objects.all())

    class Meta:
        model = VetVisit
        fields = ['id', 'pet', 'vet', 'visit_date', 'reason', 'notes', 'created_at']


class AppointmentSerializer(serializers.ModelSerializer):
    pet = serializers.PrimaryKeyRelatedField(queryset=Pet.objects.all())
    vet = serializers.PrimaryKeyRelatedField(queryset=Vet_Details.objects.all())

    class Meta:
        model = Appointment
        fields = ['id', 'pet', 'vet', 'appointment_date', 'status', 'reminder_sent', 'created_at']

class PetHealthSerializer(serializers.ModelSerializer):
    pet = serializers.PrimaryKeyRelatedField(queryset=Pet.objects.all())

    class Meta:
        model = PetHealth
        fields = ["id","pet","weight","height", "medical_conditions", "vaccinations", "notes", "record_date","created_at"]