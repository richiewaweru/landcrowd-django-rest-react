# Generated by Django 5.0.2 on 2024-02-25 01:40

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0010_alter_parcel_parcel_label"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="parcel",
            name="parcel_label",
        ),
    ]
