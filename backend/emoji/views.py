"""
Django Views Module for Emoji Tracker Application

This module contains both traditional Django views for template rendering
and REST framework ViewSets for API endpoints. It handles CRUD operations
for mood entries through both web interface and API.
"""

from django.shortcuts import render, redirect
from .models import Mood
from rest_framework import viewsets
from .serializer import MoodSerializer
from .forms import MoodForm
from django.shortcuts import get_object_or_404


def home(request):
    """
    Display the home page with a list of all mood entries.

    Retrieves all mood entries from the database, ordered by creation date
    (most recent first), and renders them in the home template.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: Rendered home.html template with mood entries.
    """
    moods = Mood.objects.all().order_by("-created_at")
    return render(request, "home.html", {"moods": moods})


def add_mood(request):
    """
    Handle the creation of a new mood entry.

    On GET requests, displays an empty form for creating a new mood.
    On POST requests, validates and saves the form data, then redirects
    to the home page.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: On GET, renders add_mood.html with an empty form.
                     On successful POST, redirects to the home page.
    """
    if request.method == "POST":
        form = MoodForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("home")
    else:
        form = MoodForm()

    return render(request, "add_mood.html", {"form": form})


def edit_mood(request, id):
    """
    Handle editing an existing mood entry.

    Retrieves the mood entry by ID and displays a form pre-populated with
    its data. On POST requests, validates and saves the updated data.

    Args:
        request (HttpRequest): The HTTP request object.
        id (int): The primary key of the mood entry to edit.

    Returns:
        HttpResponse: On GET, renders add_mood.html with the populated form.
                     On successful POST, redirects to the home page.

    Raises:
        Http404: If no mood entry with the given ID exists.
    """
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
    """
    Handle deletion of a mood entry.

    Retrieves the mood entry by ID and deletes it if the request method is POST.
    Redirects to the home page regardless of the request method.

    Args:
        request (HttpRequest): The HTTP request object.
        id (int): The primary key of the mood entry to delete.

    Returns:
        HttpResponse: Redirects to the home page after deletion or if not POST.

    Raises:
        Http404: If no mood entry with the given ID exists.
    """
    mood = get_object_or_404(Mood, id=id)

    if request.method == "POST":
        mood.delete()
        return redirect("home")
    return redirect("home")


class MoodViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for mood entries.

    Provides CRUD operations for mood entries through RESTful API endpoints.
    Automatically handles list, create, retrieve, update, and delete operations.

    Attributes:
        queryset (QuerySet): All mood entries ordered by creation date (newest first).
        serializer_class (MoodSerializer): Serializer class for mood data transformation.

    Endpoints:
        GET /api/mood/ - List all mood entries (paginated)
        POST /api/mood/ - Create a new mood entry
        GET /api/mood/{id}/ - Retrieve a specific mood entry
        PATCH /api/mood/{id}/ - Partially update a mood entry
        PUT /api/mood/{id}/ - Fully update a mood entry
        DELETE /api/mood/{id}/ - Delete a mood entry
    """

    queryset = Mood.objects.all().order_by("-created_at")
    serializer_class = MoodSerializer
