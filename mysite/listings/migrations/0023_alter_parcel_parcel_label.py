# Generated by Django 5.0.3 on 2024-03-28 21:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0022_parcel_parcel_label"),
    ]

    operations = [
        migrations.AlterField(
            model_name="parcel",
            name="parcel_label",
            field=models.IntegerField(null=True),
        ),
    ]
