# Generated by Django 5.0.3 on 2024-03-29 15:07

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("notifications", "0005_notification_land_listing"),
    ]

    operations = [
        migrations.AlterField(
            model_name="notification",
            name="notification_type",
            field=models.CharField(
                choices=[
                    ("inquiry", "Inquiry"),
                    ("new_bid", "New Bid"),
                    ("bid_deleted", "Bid Deleted"),
                    ("parcel_deleted", "Parcel Deleted"),
                    ("bid_approved", "Bid Approved"),
                    ("bid_rejected", "Bid Rejected"),
                ],
                max_length=20,
            ),
        ),
    ]
