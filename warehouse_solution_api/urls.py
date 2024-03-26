from rest_framework import routers
from .views import ItemViewSet, RetrieveChoicesView
from django.urls import path

router = routers.DefaultRouter()
router.register(r"items", ItemViewSet)

urlpatterns = [
    path('choices/', RetrieveChoicesView.as_view(), name="get_model_choices")
]

urlpatterns += router.urls
