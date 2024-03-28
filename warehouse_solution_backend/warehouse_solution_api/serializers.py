from .models import Item, Request, RequestRow
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class RequestRowSerializer(serializers.ModelSerializer):
    #item = serializers.SlugRelatedField(slug_field="name", read_only=True)
    class Meta:
        model = RequestRow
        fields = "__all__"
        #exclude = ('request', )


class RequestSerializer(serializers.ModelSerializer):
    request_rows = RequestRowSerializer(many=True, read_only=True)

    class Meta:
        model = Request
        fields = "__all__"

    def create(self, validated_data):
        request_row_data = validated_data.pop("request_row")
        instance = super().create(validated_data)

        request_row_data.update({"request": instance.id})
        request_row_serializer = RequestRowSerializer(data=request_row_data)
        request_row_serializer.is_valid(raise_exception=True)
        request_row_serializer.save()

        return instance


class RequestSerializerOnlyID(RequestSerializer):
    class Meta(RequestSerializer.Meta):
        fields = ["id"]
