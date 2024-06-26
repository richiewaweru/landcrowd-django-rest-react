# Generated by Django 5.0.3 on 2024-03-28 19:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("landbids", "0005_buyerprofile"),
        ("listings", "0020_landlisting_description"),
        ("transactions", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="transaction",
            name="user",
        ),
        migrations.AddField(
            model_name="transaction",
            name="listing",
            field=models.ForeignKey(
                default=2,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="transactions",
                to="listings.landlisting",
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="transaction",
            name="buyer",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="buyer_transactions",
                to="landbids.bid",
            ),
        ),
        migrations.AlterField(
            model_name="transaction",
            name="seller",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="seller_transactions",
                to="listings.landlisting",
            ),
        ),
    ]
