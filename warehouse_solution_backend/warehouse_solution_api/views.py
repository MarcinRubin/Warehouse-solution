from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework.decorators import action
from .models import Item, RequestRow, Request
from .models import ItemGroupSelection, UnitOfMeasurementsSelection
from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, \
    CreateModelMixin, DestroyModelMixin, UpdateModelMixin
from rest_framework import status, permissions
from rest_framework.response import Response
from .serializers import ItemSerializer, RequestSerializer, RequestRowSerializer, \
    RequestSerializerOnlyID
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect


class ItemViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin,
                  DestroyModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filterset_fields = ['name', 'item_group', 'unit_of_measurement', 'quantity',
                        'price_without_vat', 'status', 'storage_location',
                        'contact_person']
    search_fields = ['name']
    ordering_fields = '__all__'


class RequestViewSet(ListModelMixin, UpdateModelMixin, CreateModelMixin,
                     DestroyModelMixin,
                     GenericViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    def get_serializer_class(self):
        if self.action == "get_ids":
            return RequestSerializerOnlyID
        return super().get_serializer_class()

    def perform_create(self, serializer):
        print("lala")
        serializer.save(request_row=self.request.data['request_row'])

    @action(detail=False, methods=["GET"])
    def get_ids(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["PATCH"])
    def confirm_request(self, request):
        pass


class RequestRowViewSet(ListModelMixin, CreateModelMixin, GenericViewSet):
    queryset = RequestRow.objects.all()
    serializer_class = RequestRowSerializer


class RetrieveChoicesView(APIView):
    def get(self, request):
        return Response({"item_group_selection": ItemGroupSelection.values,
                         "unit_of_measurement_selection":
                             UnitOfMeasurementsSelection.values},
                        status=status.HTTP_200_OK)

