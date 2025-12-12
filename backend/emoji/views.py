from django.shortcuts import render, redirect
from .models import Mood
from rest_framework import viewsets
from .serializer import MoodSerializer
from .forms import MoodForm
from django.shortcuts import get_object_or_404

# Create your views here.
def home(request):
    moods = Mood.objects.all().order_by("-created_at")
    return render(request, "home.html", {"moods": moods})


def add_mood(request):
    if request.method == "POST":
        form = MoodForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("home") 
    else:
        form = MoodForm()

    return render(request, "add_mood.html", {"form": form})


def edit_mood(request, id):
    mood = get_object_or_404(Mood, id=id)
    if request.method == "POST":
        form = MoodForm(request.POST, instance=mood)
        if form.is_valid():
            form.save()
            return redirect("home")
    else:
        form = MoodForm(instance=mood)
    return render(request, "add_mood.html", {"form": form, "edit": True, "mood": mood})


def delete_mood(request, id):
    mood = get_object_or_404(Mood, id=id)

    if request.method == "POST":
        mood.delete()
        return redirect("home")  
    return redirect("home")

    

class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all().order_by("-created_at")
    serializer_class = MoodSerializer
