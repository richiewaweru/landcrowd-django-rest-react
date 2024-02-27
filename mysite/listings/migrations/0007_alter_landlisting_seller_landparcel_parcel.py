# Generated by Django 5.0.2 on 2024-02-21 19:37

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0006_alter_landlistingimages_maps_seller"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="landlisting",
            name="seller",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="listings",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.CreateModel(
            name="LandParcel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "land_listing",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="landparcels",
                        to="listings.landlisting",
                    ),
                ),
                (
                    "seller",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="parcels",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Parcel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("parcel_id", models.CharField(max_length=100, unique=True)),
                (
                    "area",
                    models.DecimalField(
                        decimal_places=2,
                        help_text="Area of the parcel in acres",
                        max_digits=10,
                    ),
                ),
                (
                    "price",
                    models.DecimalField(
                        decimal_places=2,
                        help_text="Asking price for the parcel",
                        max_digits=10,
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[("available", "Available"), ("sold", "Sold")],
                        default="available",
                        max_length=50,
                    ),
                ),
                (
                    "land_listing",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="parcels",
                        to="listings.landlisting",
                    ),
                ),
            ],
            options={
                "unique_together": {("land_listing", "parcel_id")},
            },
        ),
    ]
