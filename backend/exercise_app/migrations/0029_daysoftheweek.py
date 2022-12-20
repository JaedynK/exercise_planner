# Generated by Django 4.1.3 on 2022-12-18 22:09

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('exercise_app', '0028_delete_daysoftheweek'),
    ]

    operations = [
        migrations.CreateModel(
            name='DaysOfTheWeek',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('monday_groups', models.CharField(max_length=255)),
                ('tuesdayGroups', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), blank=True, size=None)),
                ('user_schedule', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dayOfTheWeek', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
