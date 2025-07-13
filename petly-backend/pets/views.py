from django.shortcuts import render
from django.http import HttpResponse
from .serializers import PetSerializer, FoodLogSerializer, VetSerializer
from rest_framework import viewsets
from .models import Pet, Food_Log, Vet_Details

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
        queryset = self.queryset #Just saying this local queryset is the one from the main class, need to override the main querySet
        pet_id = self.request.query_params.get('petId') #Checks weather the URL parameters contains 'petId' or not 
        #If yes then it queries the DB where prtId = the valu passed in the URL parameter
        # E.g:  So /api/foodlogs/?petid=123 will get values where petId =123
        if pet_id:
            return queryset.filter(petId=pet_id) 
        return queryset

class VetViewSet(viewsets.ModelViewSet):
    queryset = Vet_Details.objects.all() #This is just saying Select * From Pet
    serializer_class = VetSerializer
     #Here the query set is created, this query set contains all the DB queries, it creates SQL queries and commmunicates with DB accordingly
    def get_queryset(self):
        queryset = self.queryset #Just saying this local queryset is the one from the main class, need to override the main querySet
        pet_id = self.request.query_params.get('petId') #Checks weather the URL parameters contains 'petId' or not 
        #If yes then it queries the DB where prtId = the valu passed in the URL parameter
        # E.g:  So /api/vets/?petid=123 will get values where petId =123
        if pet_id:
            return queryset.filter(petId=pet_id) 
        return queryset

    
