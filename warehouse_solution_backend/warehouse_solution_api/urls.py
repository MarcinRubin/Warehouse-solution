from rest_framework import routers
from .views import ItemViewSet, RetrieveChoicesView, RequestViewSet, RequestRowViewSet
from django.urls import path

router = routers.DefaultRouter()
router.register(r"items", ItemViewSet)
router.register(r"requests", RequestViewSet)
router.register(r"requests_row", RequestRowViewSet)

urlpatterns = [
    path('choices/', RetrieveChoicesView.as_view(), name="get_model_choices")
]

urlpatterns += router.urls
