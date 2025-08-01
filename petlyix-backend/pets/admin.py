from django.contrib import admin

# Register your models here.
from .models import Pet, Food_Log
admin.site.register(Pet)
admin.site.register(Food_Log)