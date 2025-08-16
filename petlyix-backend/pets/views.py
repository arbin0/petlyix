from django.shortcuts import render
from django.http import HttpResponse
from .serializers import PetSerializer, FoodLogSerializer, VetSerializer
from rest_framework import viewsets
from .models import Pet, Food_Log, Vet_Details
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
        if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
            raise ValidationError("You do not have permission to access this pet's food logs.")
        return self.queryset.filter(petId=pet_id)


class VetViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = VetSerializer
    queryset = Vet_Details.objects.all()

    def get_queryset(self):
        pet_id = self.request.query_params.get('petId')
        if not pet_id:
            raise ValidationError("petId query parameter is required.")
        if not Pet.objects.filter(id=pet_id, ownerId=self.request.user.id).exists():
            raise ValidationError("You do not have permission to access this pet's Vet details.")
        return self.queryset.filter(petId=pet_id)
       

    
