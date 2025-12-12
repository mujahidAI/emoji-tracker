from django import forms
from .models import Mood

class MoodForm(forms.ModelForm):
    class Meta:
        model = Mood
        fields = ["emoji", "reason"]
        widgets = {
            "emoji": forms.TextInput(
                attrs={
                    "id": "emoji-input",
                    "readonly": "readonly",  # user should select from picker
                    "placeholder": "Click an emoji below",
                }
            ),
            "reason": forms.Textarea(
                attrs={"rows": 3, "placeholder": "Why do you feel this way?"}
            ),
        }
