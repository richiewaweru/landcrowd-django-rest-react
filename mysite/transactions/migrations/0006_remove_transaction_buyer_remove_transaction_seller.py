# Generated by Django 5.0.3 on 2024-03-29 19:57

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("transactions", "0005_alter_transaction_buyer_alter_transaction_seller"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="transaction",
            name="buyer",
        ),
        migrations.RemoveField(
            model_name="transaction",
            name="seller",
        ),
    ]
