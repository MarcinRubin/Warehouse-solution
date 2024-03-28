from .models import Item

class RequestError(Exception):
    def __init__(self, error_list):
        self.errors = error_list

    def __str__(self):
        items_list = ", ".join(self.errors)
        return f'There is not enough {items_list} items in warehouse!'


class PerformConfirm:
    def __init__(self, instance):
        self.transactions = list(instance.request_rows.values("quantity",
                                                              "item__quantity",
                                                              "item__name"))
        self.error_list = []
        self.transactions_quantity = {}

    def perform_transaction(self):
        for transaction in self.transactions:
            key = transaction['item__name']
            if key in self.transactions_quantity:
                self.transactions_quantity[key] -= transaction['quantity']
            else:
                self.transactions_quantity.update(
                    {key: transaction['item__quantity'] - transaction['quantity']}
                )

        self.error_list = [item[0] for item in self.transactions_quantity.items() if
                           item[
                               1] < 0]

    def is_valid(self):
        if self.error_list:
            raise RequestError(self.error_list)

    def save(self):
        for transaction in self.transactions_quantity.items():
            item = Item.objects.filter(name=transaction[0])[0]
            item.quantity = transaction[1]
            item.save()
