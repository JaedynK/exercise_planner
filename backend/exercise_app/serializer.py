from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AppUser
        fields = '__all__'

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Exercise
        fields = '__all__'

class PassWorkoutsSerializer(serializers.ModelSerializer):
    class  Meta:
        model=PassWorkouts
        fields = '__all__'

class DaysOfTheWeekSerializer(serializers.ModelSerializer):
    class  Meta:
        model=DaysOfTheWeek
        fields = '__all__'