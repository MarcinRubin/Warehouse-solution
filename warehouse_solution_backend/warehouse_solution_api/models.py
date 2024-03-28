from django.db import models
from django.contrib.auth.models import User


class ItemGroupSelection(models.TextChoices):
    DAIRY = "Dairy",
    FRUITS = "Fruits",
    VEGETABLES = "Vegetables",
    SEAFOOD = "Seafood",
    BAKERY = "Bakery",


class UnitOfMeasurementsSelection(models.TextChoices):
    BOX = "Box",
    PALLET = "Pallet",
    CARTON = "Carton",
    EACH = "Each",
    KG = "kg"


class Item(models.Model):
    name = models.CharField(max_length=100, unique=True)
    item_group = models.CharField(
        max_length=100,
        choices=ItemGroupSelection.choices,
    )
    unit_of_measurement = models.CharField(
        max_length=10,
        choices=UnitOfMeasurementsSelection.choices,
    )
    quantity = models.PositiveIntegerField()
    price_without_vat = models.FloatField()
    status = models.CharField(max_length=100)
    storage_location = models.CharField(max_length=100, blank=True, null=True)
    contact_person = models.CharField(max_length=100, blank=True, null=True)
    photo = models.ImageField(blank=True, null=True)


class Request(models.Model):
    class StatusSelection(models.TextChoices):
        NEW = "New",
        APPROVED = "Approved",
        REJECTED = "Rejected"

    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=100, choices=StatusSelection.choices,
                              default=StatusSelection.NEW)


class RequestRow(models.Model):
    request = models.ForeignKey(Request, on_delete=models.CASCADE,
                                related_name="request_rows")
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price_without_vat = models.FloatField()
    comment = models.TextField(blank=True, null=True)
