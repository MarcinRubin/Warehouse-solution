from django.shortcuts import render
from django.utils.decorators import method_decorator

from .models import Item, RequestRow, Request
from .models import ItemGroupSelection, UnitOfMeasurementsSelection
from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin
from rest_framework import status
from rest_framework.response import Response
from .serializers import ItemSerializer, RequestSerializer, RequestRowSerializer
from django.views.decorators.csrf import ensure_csrf_cookie


class ItemViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, GenericViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filterset_fields = ['name', 'item_group', 'unit_of_measurement', 'quantity',
                        'price_without_vat', 'status', 'storage_location',
                        'contact_person']
    search_fields = ['name']
    ordering_fields = '__all__'


@method_decorator(ensure_csrf_cookie, name="dispatch")
class RetrieveChoicesView(APIView):
    def get(self, request):
        return Response({"item_group_selection": ItemGroupSelection.values,
                         "unit_of_measurement_selection":
                             UnitOfMeasurementsSelection.values},
                        status=status.HTTP_200_OK)
