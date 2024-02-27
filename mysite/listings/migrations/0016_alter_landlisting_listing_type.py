# Generated by Django 5.0.2 on 2024-02-26 21:19

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0015_landlisting_listing_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="landlisting",
            name="listing_type",
            field=models.CharField(
                choices=[("for sale", "For Sale"), ("for lease", "For Lease")],
                default="sale",
                max_length=9,
                null=True,
            ),
        ),
    ]