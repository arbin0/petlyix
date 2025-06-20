from django.db import models
import uuid
from django.utils.timezone import now

# Create your models here.

class Pet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length= 255, null= False, blank = True)
    type = models.CharField(max_length = 255, null = False, blank= True) #Type means, cat, dog, lizard
    breed = models.CharField(max_length = 255)

class Food_Log(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    petId = models.ForeignKey(Pet, on_delete=models.CASCADE) 
    name = models.CharField(max_length = 255)
    calories = models.IntegerField()
    logged_time = models.DateTimeField(default=now, blank=True, null= False)
   