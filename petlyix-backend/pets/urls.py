from django.urls import path, include
from rest_framework import routers
from . import views
from .views import PetViewSet, FoodLogViewSet, VetViewSet, PetHealthViewSet, VetVisitViewSet, AppointmentViewSet

# DRF router
router = routers.DefaultRouter()
router.register(r'pets', PetViewSet)
router.register(r'foodlogs', FoodLogViewSet)
router.register(r'vets', VetViewSet)
router.register(r'pethealth', PetHealthViewSet)
router.register(r'vetvisits', VetVisitViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path("index/", views.index, name="index"),
    path("", include(router.urls)),
]
