from django.shortcuts import render
from django.http import HttpResponse
from .serializers import PetSerializer, FoodLogSerializer, VetSerializer, VetVisitSerializer, AppointmentSerializer, PetHealthSerializer
from rest_framework import viewsets
from .models import Pet, Food_Log, Vet_Details, VetVisit, Appointment, PetHealth
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

def index(request):
   return HttpResponse("Wassup Randis")

class PetViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = PetSerializer
    queryset = Pet.objects.all()  # <-- required for DRF router
     
    def get_queryset(self):
        return self.queryset.filter(ownerId=self.request.user.id)
   
   
class FoodLogViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = FoodLogSerializer
    queryset = Food_Log.objects.all()

    def get_queryset(self):
        pet_id = self.request.query_params.get('petId')
        if not pet_id:
            raise ValidationError("petId query parameter is required.")
        #Here checking if the pet_id of the food logs belongs to the authenticated user
        if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
            raise ValidationError("You do not have permission to access this pet's food logs.")
        return self.queryset.filter(petId=pet_id)


class VetViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = VetSerializer
    queryset = Vet_Details.objects.all()

    def get_queryset(self):
        pet_id = self.request.query_params.get('petId')
        if pet_id:
            if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
                raise ValidationError("You do not have permission to access this pet's Vet details.")
            return self.queryset.filter(pets__id=pet_id)
        return self.queryset

    def perform_create(self, serializer):
        # Validate that all pets passed belong to the current user
        pets = self.request.data.get('pets', [])
        for pet_id in pets:
            if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
                raise ValidationError(f"You do not have permission to assign pet {pet_id} to this vet.")
        serializer.save()
       

class VetVisitViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = VetVisitSerializer
    queryset = VetVisit.objects.all()

    def get_queryset(self):
        pet_id = self.request.query_params.get("petId")
        if not pet_id:
            raise ValidationError("petId query parameter is required.")

        # Ensure this pet belongs to the logged-in user
        if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
            raise ValidationError("You do not have permission to access this pet's vet visits.")

        return self.queryset.filter(pet_id=pet_id)

    def perform_create(self, serializer):
        pet_id = self.request.data.get("pet")
        if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
            raise ValidationError("You do not have permission to add visits for this pet.")

        serializer.save()


class AppointmentViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def get_queryset(self):
        pet_id = self.request.query_params.get("petId")
        if not pet_id:
            raise ValidationError("petId query parameter is required.")

        # Ensure this pet belongs to the logged-in user
        if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
            raise ValidationError("You do not have permission to access this pet's appointments.")

        return self.queryset.filter(pet_id=pet_id)

    def perform_create(self, serializer):
        pet_id = self.request.data.get("pet")
        if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
            raise ValidationError("You do not have permission to schedule appointments for this pet.")

        serializer.save()

class PetHealthViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = PetHealthSerializer
    queryset = PetHealth.objects.all()

    def get_queryset(self):
        pet_id = self.request.query_params.get("petId")
        if not pet_id:
            raise ValidationError("petId query parameter is required.")

        # Ensure this pet belongs to the logged-in user
        if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
            raise ValidationError("You do not have permission to access this pet's health records.")

        return self.queryset.filter(pet_id=pet_id)

    def perform_create(self, serializer):
        pet_id = self.request.data.get("pet")
        # Validate that the pet belongs to the authenticated user
        if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
            raise ValidationError("You do not have permission to add health records for this pet.")

        serializer.save()
