# Generated by Django 5.0.1 on 2024-05-07 18:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_api', '0003_alter_item_category_alter_item_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_api.category'),
        ),
    ]
