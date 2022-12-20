from django.db import models
from django.contrib.auth.models import (AbstractUser)
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class AppUser(AbstractUser):
    """
    user account
    """
    email = models.EmailField(
        max_length=255,
        unique=True,
    )

    is_active =  models.BooleanField(
       default=True,
       help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active',
    )

    # USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


def get_deleted_user_instance():
    return AppUser.objects.get(username='deleted')



class Exercise(models.Model):
    exercise_title =models.CharField(max_length=50)
    muscile_group = models.CharField(max_length=50)
    equipment = models.CharField(max_length=50)
    workout_type = models.CharField(max_length=50)
    user_exercise = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name = 'MusicleGroup')
    reps = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)


class PassWorkouts(models.Model):
    exercise = models.CharField(max_length=200)
    muscile_group = models.CharField(max_length=50)
    reps = models.CharField(max_length=50)
    weight = models.CharField(max_length=50)
    workout_date = models.DateTimeField(default=timezone.now)
    user_passWorkouts = models.ForeignKey(AppUser, on_delete = models.SET(get_deleted_user_instance), related_name = 'exercise')

class DaysOfTheWeek(models.Model):
    mondayGroups = ArrayField(models.CharField(max_length=255), blank= True)
    tuesdayGroups  = ArrayField(models.CharField(max_length=255), blank= True)
    wednesdayGroups  = ArrayField(models.CharField(max_length=255), blank= True)
    thursdayGroups  = ArrayField(models.CharField(max_length=255), blank= True)
    fridayGroups  = ArrayField(models.CharField(max_length=255), blank= True)
    saturdayGroups  = ArrayField(models.CharField(max_length=255), blank= True)
    sundayGroups  = ArrayField(models.CharField(max_length=255), blank= True)
    user_schedule = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name = 'dayOfTheWeek')

# DaysOfTheWeek.objects.create(mondayGroups = ['chest'])
# tuesdayGroups =['back'],
#         wednesdayGroups =['traps'], thursdayGroups =['forearms'],
#         fridayGroups =['abdominals'],saturdayGroups =['triceps'],
#         sundayGroups =['biceps'])
