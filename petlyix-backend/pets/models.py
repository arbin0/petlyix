from django.db import models
import uuid
from django.utils.timezone import now
from django.conf import settings


# Create your models here.

class Pet(models.Model):
    PET_TYPES = [
        ("dog", "Dog"),
        ("cat", "Cat"),
        ("fish", "Fish"),
        ("bird", "Bird"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length= 255, null= False, blank = False)
    type = models.CharField(max_length = 255, null = False, blank= False, choices=PET_TYPES) #Type means, cat, dog, lizard
    breed = models.CharField(max_length = 255, blank= True)
    photo = models.ImageField(upload_to='pet_photos/', blank=True, null=True)
    dob = models.DateField(null=True, blank=True)
    vets = models.ManyToManyField('Vet_Details', related_name='pets', blank=True)
    ownerId = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name ='pets', null= False, blank = False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
    class Meta:
        ordering = ['created_at']

class Food_Log(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    petId = models.ForeignKey(Pet, on_delete=models.CASCADE) 
    name = models.CharField(max_length = 255)
    calories = models.IntegerField()
    logged_time = models.DateTimeField(default=now, blank=True, null= False)
    def __str__(self):
        return self.name

class Vet_Details(models.Model):
    id = models.UUIDField(primary_key= True, default = uuid.uuid4, null = False, editable=False)
    name = models.CharField(max_length=255, null = False)
    phone = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    main_doctor= models.CharField(max_length=255)
    #address Fields
    address_line1 = models.CharField(max_length=255, blank=True)   # e.g., street address, building number
    address_line2 = models.CharField(max_length=255, blank=True)   # e.g., apartment, suite, unit (optional)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, blank=True)
    def __str__(self):
        return self.name
