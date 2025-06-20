from django.shortcuts import render
from django.http import HttpResponse
from .serializers import PetSerializer, FoodLogSerializer 
from rest_framework import viewsets
from .models import Pet, Food_Log

def index(request):
   return HttpResponse("Wassup Randis")

class PetViewSet(viewsets.ModelViewSet):
    serializer_class = PetSerializer
    queryset = Pet.objects.all()
   
   
class FoodLogViewSet(viewsets.ModelViewSet):
    queryset = Food_Log.objects.all() #This is just saying Select * From Pet
    serializer_class = FoodLogSerializer
     #Here the query set is created, this query set contains all the DB queries, it creates SQL queries and commmunicates with DB accordingly
    def get_queryset(self):
        queryset = self.queryset #Just saying this local queryset is the one from the main class
        pet_id = self.request.query_params.get('petId')
        if pet_id:
            return queryset.filter(petId=pet_id)
        return queryset