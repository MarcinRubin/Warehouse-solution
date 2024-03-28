import factory.fuzzy
from factory.django import DjangoModelFactory
from factory import Faker
from .models import Item

ITEM_GROUP_CHOICES = ["Dairy", "Fruits", "Vegetables", "Seafood", "Bakery"]
UNIT_CHOICES = ["Pallet", "Box", "Carton", "Each", "kg"]


# Defining a factory
class ItemFactory(DjangoModelFactory):
    name = Faker("first_name")
    item_group = Faker('random_element', elements=ITEM_GROUP_CHOICES)
    unit_of_measurement = Faker('random_element', elements=UNIT_CHOICES)
    quantity = Faker('random_int', min=1, max=20)
    price_without_vat = Faker('numerify', text='#.##')
    status = "Available"
    storage_location = Faker("city")
    contact_person = Faker("first_name")

    class Meta:
        model = Item
