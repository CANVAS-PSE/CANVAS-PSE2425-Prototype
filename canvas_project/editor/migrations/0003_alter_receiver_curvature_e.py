# Generated by Django 5.1.4 on 2025-01-02 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editor', '0002_heliostat_position_x_heliostat_position_y_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='receiver',
            name='curvature_e',
            field=models.FloatField(blank=True, default=None),
        ),
    ]
