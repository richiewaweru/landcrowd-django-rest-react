# Generated by Django 5.0.2 on 2024-02-25 01:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0009_remove_parcel_parcel_id_parcel_parcel_label"),
    ]

    operations = [
        migrations.AlterField(
            model_name="parcel",
            name="parcel_label",
            field=models.IntegerField(unique=True),
        ),
    ]