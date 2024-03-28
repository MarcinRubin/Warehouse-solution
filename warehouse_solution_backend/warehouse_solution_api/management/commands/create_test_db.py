from django.core.management.base import BaseCommand
from warehouse_solution_backend.warehouse_solution_api.models import Item, Request, RequestRow
from warehouse_solution_backend.warehouse_solution_api.factories import ItemFactory

NUM_ITEMS = 20


class Command(BaseCommand):
    help = "Generates test data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old data...")
        Item.objects.all().delete()
        Request.objects.all().delete()
        RequestRow.objects.all().delete()
        self.stdout.write("Creating new data...")
        self._create_db()

    def _create_db(self):
        # Create Items
        for _ in range(NUM_ITEMS):
            item = ItemFactory()
