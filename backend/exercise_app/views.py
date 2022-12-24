from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.core import serializers
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import *
from .serializer import *

# Create your views here.
@api_view(['GET'])
def index(request):
    print(request.data)
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(["POST"])
def signIn(request):
    username=request.data['username']
    password=request.data["password"]
    print(username, password)
    user = authenticate(password=password, username=username)
    print(user, 'user')
    if user is not None:
        try:
            login(request._request, user)
            return JsonResponse({'signIn':True})
        except Exception as e:
            print(e)
            return JsonResponse({'signIn':False})
    else:
        return JsonResponse({'signIn':False})

    
@api_view(["GET"])
def curr_user(request):

    if request.user.is_authenticated:
        user = request.user
        data=UserSerializer(user, many=False)
        # print(data.data)
        return Response(data.data)
    else:
        return JsonResponse({"user":None})

@api_view(['DELETE'])
def get_user(request,user_id):
    print(request)
    if request.method == 'DELETE':
        data=AppUser.objects.get(pk=user_id)
        # print(data)
        data.delete()
        return HttpResponse({'success': True})


@api_view(["POST"])
def signUp(request):
    username=request.data['username']
    first_name=request.data['first_name']
    last_name=request.data['last_name']
    email=request.data["email"]
    password=request.data["password"]
    print(email, password,)
    try:
        new_user = AppUser.objects.create_user(username=username, email=email, password=password, first_name=first_name,last_name=last_name)
        print(new_user, 'test1')
        return JsonResponse({'signup':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signup':False})

def signOut(request):
    try:
        logout(request)
        return JsonResponse({'signout':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signout':False})

@api_view(["POST", 'GET'])
def exercise(request):

    try:
        if request.method == 'POST':
            print(request.data)
            exercise_title= request.data['exercise_title']
            muscile_group =request.data['muscile_group']
            equipment = request.data['equipment']
            workout_type = request.data['workout_type']
            user_exercise =  AppUser.objects.get(id=request.data['user_exercise'])
            weight= request.data['weight']
            reps = request.data['reps']
            sets = request.data['sets']

            newExercise = Exercise(exercise_title=exercise_title, muscile_group=muscile_group,
            equipment=equipment,workout_type=workout_type, user_exercise=user_exercise, weight=weight, reps=reps,sets=sets)
            newExercise.save()
            return JsonResponse({'new exercise': True})
        
        elif request.method == 'GET':
            exercise = Exercise.objects.all()
            exerciseData=ExerciseSerializer(exercise, many=True )
            # print(exerciseData.data)
            # print(exercise)
            return Response(exerciseData.data)

    except Exception as e:
        print(e)
        return JsonResponse({'exercise':False})


@api_view(['GET'])
def getMuscileGroupExercise(request, muscileGroup):
    if request.method == 'GET':
        if request.user.is_authenticated:
            multi = muscileGroup.split(',')
            user = request.user.id
            groupArray = []
            for x in multi:
                foundExercises = Exercise.objects.all().filter(user_exercise=user, muscile_group=x)
                exerciseData=ExerciseSerializer(foundExercises, many=True )
                groupArray.append(exerciseData.data)
            return Response(groupArray)
    elif request.method == 'PUT':
        pass
    elif request.method == 'DELETE':
        found = Exercise.objects.get(id = muscileGroup)
        found.delete()

@api_view(['GET', 'PUT', 'DELETE'])
def getExercise(request, exerciseId):
    if request.method == 'DELETE':
        found = Exercise.objects.get(id = exerciseId)
        found.delete()
        return Response({'success': True, 'id': exerciseId})
    if request.method == 'PUT':
        found = Exercise.objects.get(id = exerciseId)
        found.reps = request.data['reps'] or found.reps
        found.weight = request.data['weight'] or found.weight
        found.sets = request.data['sets'] or found.sets
        found.save()
        return Response({'success': True, 'id': exerciseId})
    else:
        return Response({'success': False})


@api_view(['GET'])
def weekdaygroup(request):
    if request.user.is_authenticated:
            user = request.user.id
    if request.method == 'GET':
        day = DaysOfTheWeek.objects.all().filter(user_schedule=user)
        dayData= DaysOfTheWeekSerializer(day, many=True )
        # print(dayData.data)
        return Response(dayData.data)
    elif request.method == 'POST':
        return
    elif request.method == 'PUT':
        pass
    elif request.method == 'DELETE':
        pass

@api_view(['POST', 'DELETE'])
def deleteWeekdayGroup(request, day, group):
    # print(day, group)
    user = request.user.id
# -----------
# -----------Put group day
    if request.method == 'DELETE':
        if day == 'mondayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.mondayGroups
            work = arr.index(group)
            arr.pop(work)
            userWorkoutSchedule.mondayGroups = arr
            userWorkoutSchedule.save()
            return JsonResponse({'success': True})

        if day == 'tuesdayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.tuesdayGroups
            work = arr.index(group)
            arr.pop(work)
            userWorkoutSchedule.tuesdayGroups = arr
            userWorkoutSchedule.save()
           
            return JsonResponse({'success': True})
        if day == 'wednesdayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.wednesdayGroups
            work = arr.index(group)
            arr.pop(work)
            userWorkoutSchedule.wednesdayGroups = arr
            userWorkoutSchedule.save()
          
            return JsonResponse({'success': True})
        if day == 'thursdayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.thursdayGroups
            work = arr.index(group)
            arr.pop(work)
            userWorkoutSchedule.thursdayGroups = arr
            userWorkoutSchedule.save()
  
            return JsonResponse({'success': True})
        if day == 'fridayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.fridayGroups
            work = arr.index(group)
            arr.pop(work)
            userWorkoutSchedule.fridayGroups = arr
            userWorkoutSchedule.save()
     
            return JsonResponse({'success': True})

        if day == 'saturdayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.saturdayGroups
            work = arr.index(group)
            arr.pop(work)
            userWorkoutSchedule.mondayGroups = arr
            userWorkoutSchedule.save()
           
            return JsonResponse({'success': True})

        if day == 'sundayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.sundayGroups
            work = arr.index(group)
            arr.pop(work)
            userWorkoutSchedule.sundayGroups = arr
            userWorkoutSchedule.save()

            return JsonResponse({'success': True})
# -----------
# -----------Post group day
    if request.method == 'POST':
        if day == 'mondayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.mondayGroups
            arr.append(group)
            userWorkoutSchedule.mondayGroups = arr
            userWorkoutSchedule.save()
   
            return JsonResponse({'success': True})
        if day == 'tuesdayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.tuesdayGroups
            arr.append(group)
            userWorkoutSchedule.tuesdayGroups = arr
            userWorkoutSchedule.save()
           
            return JsonResponse({'success': True})
        if day == 'wednesdayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.wednesdayGroups
            arr.append(group)
            userWorkoutSchedule.wednesdayGroups = arr
            userWorkoutSchedule.save()
          
            return JsonResponse({'success': True})
        if day == 'thursdayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.thursdayGroups
            arr.append(group)
            userWorkoutSchedule.thursdayGroups = arr
            userWorkoutSchedule.save()
  
            return JsonResponse({'success': True})
        if day == 'fridayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.fridayGroups
            arr.append(group)
            userWorkoutSchedule.fridayGroups = arr
            userWorkoutSchedule.save()
     
            return JsonResponse({'success': True})

        if day == 'saturdayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.saturdayGroups
            arr.append(group)
            userWorkoutSchedule.mondayGroups = arr
            userWorkoutSchedule.save()
           
            return JsonResponse({'success': True})

        if day == 'sundayGroups':
            userWorkoutSchedule = DaysOfTheWeek.objects.get(user_schedule=user)
            arr = userWorkoutSchedule.sundayGroups
            arr.append(group)
            userWorkoutSchedule.sundayGroups = arr
            userWorkoutSchedule.save()

            return JsonResponse({'success': True})

# -----------
# ----------- group day

    else:
        return Response({'worked':False})