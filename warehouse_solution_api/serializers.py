from .models import Item, Request, RequestRow
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = "__all__"


class RequestRowSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestRow
        fields = "__all__"
