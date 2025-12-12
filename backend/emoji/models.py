from django.db import models

EMOJI_CHOICES = [
    ("😀", "😀"),
    ("🙂", "🙂"),
    ("😐", "😐"),
    ("😢", "😢"),
    ("😡", "😡"),
    ("😴", "😴"),  
]

# Create your models here.

class Mood(models.Model):
    emoji = models.CharField(max_length=10, choices=EMOJI_CHOICES)
    reason = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        datetime_str = self.created_at.strftime("%Y-%m-%d %H:%M")
        return f"{self.emoji} - {self.reason[:20]} ({datetime_str})"
