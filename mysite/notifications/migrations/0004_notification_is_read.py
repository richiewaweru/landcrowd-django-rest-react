# Generated by Django 5.0.3 on 2024-03-26 19:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("notifications", "0003_remove_notification_is_read"),
    ]

    operations = [
        migrations.AddField(
            model_name="notification",
            name="is_read",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
