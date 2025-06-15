from django.shortcuts import render
from django.http import HttpResponse
from .serializers import PetSerializer, FoodLogSerializer 
from rest_framework import viewsets
from .models import Pet, Food_Log

def index(request):
   return HttpResponse("Wassup Randis")

class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
class FoodLogViewSet(viewsets.ModelViewSet):
    queryset = Food_Log.objects.all()
    serializer_class = FoodLogSerializer