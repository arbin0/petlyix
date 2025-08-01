from django.urls import path,include
from . import views
from rest_framework import routers
from .views import PetViewSet, FoodLogViewSet

router = routers.DefaultRouter()
router.register(r'pets', views.PetViewSet)
router.register(r'foodlogs', views.FoodLogViewSet)
router.register(r'vets', views.VetViewSet)
urlpatterns =[
    path("index", views.index, name ="index"),
    path("", include(router.urls)),   

]