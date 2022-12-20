from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(AppUser)
admin.site.register(Exercise)
admin.site.register(PassWorkouts)
admin.site.register(DaysOfTheWeek)
