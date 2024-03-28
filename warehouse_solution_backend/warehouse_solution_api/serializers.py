from .models import Item, Request, RequestRow
from rest_framework import serializers
from django.contrib.auth.models import User


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class RequestRowSerializerSave(serializers.ModelSerializer):
    class Meta:
        model = RequestRow
        fields = "__all__"


class RequestRowSerializer(RequestRowSerializerSave):
    item = serializers.SlugRelatedField(slug_field="name", read_only=True)
    unit_of_measurement = serializers.SerializerMethodField()

    def get_unit_of_measurement(self, obj):
        return obj.item.unit_of_measurement

class RequestSerializer(serializers.ModelSerializer):
    request_rows = RequestRowSerializer(many=True, read_only=True)
    employee = serializers.SlugRelatedField(slug_field="username",
                                            queryset=User.objects.all())

    class Meta:
        model = Request
        fields = "__all__"

    def create(self, validated_data):
        request_row_data = validated_data.pop("request_row")
        instance = super().create(validated_data)

        request_row_data.update({"request": instance.id})
        request_row_serializer = RequestRowSerializerSave(data=request_row_data)
        request_row_serializer.is_valid(raise_exception=True)
        request_row_serializer.save()

        return instance


class RequestSerializerOnlyID(RequestSerializer):
    class Meta(RequestSerializer.Meta):
        fields = ["id"]
