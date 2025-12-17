from rest_framework import serializers
from .models import Mood 

class MoodSerializer(serializers.ModelSerializer):
    """
    Serializer for the Mood model.

    This serializer converts Mood model instances to JSON representations
    and vice-versa, making them suitable for API interactions.
    """
    class Meta:
        model = Mood
        fields = '__all__'
