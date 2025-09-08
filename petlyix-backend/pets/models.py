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
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
    class Meta:
        ordering = ['-logged_time']

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
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
    class Meta:
        ordering = ['created_at']

class VetVisit(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="vet_visits")
    vet = models.ForeignKey(Vet_Details, on_delete=models.CASCADE, related_name="vet_visits")
    visit_date = models.DateTimeField()
    reason = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Visit for {self.pet.name} with {self.vet.name} on {self.visit_date.strftime('%Y-%m-%d %H:%M')}"
    class Meta:
        ordering = ['-visit_date']

class Appointment(models.Model):
    STATUS_CHOICES = [
        ("scheduled", "Scheduled"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
        ("no_show", "No Show"),
    ]

    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="appointments")
    vet = models.ForeignKey(Vet_Details, on_delete=models.CASCADE, related_name="appointments")
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="scheduled")
    reminder_sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-appointment_date']

    def __str__(self):
        return f"Appointment for {self.pet.name} with {self.vet.name} on {self.appointment_date.strftime('%Y-%m-%d %H:%M')}"

class PetHealth(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="health_records")
    weight = models.FloatField()
    height = models.FloatField(blank=True, null=True)
    medical_conditions = models.TextField(blank=True)
    vaccinations = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    record_date = models.DateTimeField(default=now)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return f"Health record for {self.pet.name} on {self.record_date.strftime('%Y-%m-%d')}"
    