# Generated by Django 4.1.3 on 2022-12-18 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercise_app', '0008_delete_daysoftheweek'),
    ]

    operations = [
        migrations.CreateModel(
            name='DaysOfTheWeek',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]