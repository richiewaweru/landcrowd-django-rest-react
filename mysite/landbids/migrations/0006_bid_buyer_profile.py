# Generated by Django 5.0.3 on 2024-03-29 19:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("landbids", "0005_buyerprofile"),
    ]

    operations = [
        migrations.AddField(
            model_name="bid",
            name="buyer_profile",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="bids",
                to="landbids.buyerprofile",
            ),
        ),
    ]
