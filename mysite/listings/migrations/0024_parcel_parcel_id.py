# Generated by Django 5.0.3 on 2024-03-28 22:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0023_alter_parcel_parcel_label"),
    ]

    operations = [
        migrations.AddField(
            model_name="parcel",
            name="parcel_id",
            field=models.CharField(default=0, max_length=100, unique=True),
            preserve_default=False,
        ),
    ]
