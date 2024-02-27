# Generated by Django 5.0.2 on 2024-02-25 18:18

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("landbids", "0002_remove_bid_bid_price_remove_bid_fraction_and_more"),
        ("listings", "0013_alter_parcel_parcel_label"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="bid",
            name="bidder",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="bids",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="bid",
            name="listing",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="bids_on_listing",
                to="listings.landlisting",
            ),
        ),
    ]
