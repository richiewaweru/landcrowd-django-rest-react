# Generated by Django 4.2.4 on 2023-12-05 21:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("listings", "0004_landlisting_active_bid_size_landlistingimages_maps"),
    ]

    operations = [
        migrations.AddField(
            model_name="landlistingimages_maps",
            name="seller",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
