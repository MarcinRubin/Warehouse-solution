# Generated by Django 5.0.3 on 2024-03-25 12:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse_solution_api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='item_name',
            new_name='name',
        ),
    ]
