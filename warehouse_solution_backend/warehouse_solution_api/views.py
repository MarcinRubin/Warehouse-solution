
from rest_framework.decorators import action
from .models import Item, RequestRow, Request
from .models import ItemGroupSelection, UnitOfMeasurementsSelection
from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, \
    CreateModelMixin, DestroyModelMixin, UpdateModelMixin
from rest_framework import status
from rest_framework.response import Response
from .serializers import ItemSerializer, RequestSerializer, RequestRowSerializer, \
    RequestSerializerOnlyID, RequestRowSerializerSave
from .perform_confirm import PerformConfirm, RequestError


class ItemViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin,
                  DestroyModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filterset_fields = ['item_group', 'unit_of_measurement']
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

    def create(self, request, *args, **kwargs):
        request.data.update({"employee": request.user.username})
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        queryset = super().get_queryset()
        if "Employee" in list(self.request.user.groups.values_list("name", flat=True)):
            queryset = queryset.filter(employee__id=self.request.user.id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(request_row=self.request.data['request_row'])

    @action(detail=False, methods=["GET"])
    def get_ids(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["PATCH"])
    def confirm_request(self, request, pk=None):
        instance = self.get_object()
        order = PerformConfirm(instance)
        order.perform_transaction()
        try:
            order.is_valid()
        except RequestError as err:
            return Response({"message": str(err)}, status=status.HTTP_400_BAD_REQUEST)
        order.save()

        return super().partial_update(request)




class RequestRowViewSet(ListModelMixin, CreateModelMixin, GenericViewSet):
    queryset = RequestRow.objects.all()
    serializer_class = RequestRowSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return RequestRowSerializerSave
        return super().get_serializer_class()


class RetrieveChoicesView(APIView):
    def get(self, request):
        return Response({"item_group_selection": ItemGroupSelection.values,
                         "unit_of_measurement_selection":
                             UnitOfMeasurementsSelection.values},
                        status=status.HTTP_200_OK)

