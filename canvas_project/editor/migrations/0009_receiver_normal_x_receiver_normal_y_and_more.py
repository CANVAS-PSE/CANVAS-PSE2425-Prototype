# Generated by Django 5.1.4 on 2025-01-04 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editor', '0008_rename_rotation_receiver_rotation_y'),
    ]

    operations = [
        migrations.AddField(
            model_name='receiver',
            name='normal_x',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='receiver',
            name='normal_y',
            field=models.FloatField(default=1),
        ),
        migrations.AddField(
            model_name='receiver',
            name='normal_z',
            field=models.FloatField(default=0),
        ),
    ]