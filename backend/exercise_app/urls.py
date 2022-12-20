from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('signIn/', views.signIn),
    path('signUp/', views.signUp),
    path('signOut/', views.signOut),
    path('current_user/', views.curr_user),
    path('current_user/<int:user_id>/', views.get_user),
    path('exercise/', views.exercise),
    path('exercise/<int:exerciseId>/', views.getExercise),
    path('exercises/<str:muscileGroup>/', views.getMuscileGroupExercise),
    path('weekday/', views.weekdaygroup),
    re_path(r'.*', views.index, name='index'),
    # re_path(r'/s*/?', views.index, name='index'),

]