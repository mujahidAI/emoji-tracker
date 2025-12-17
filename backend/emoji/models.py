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
    """
    Represents a user's mood entry, including an emoji, an optional reason,
    and the timestamp when it was created.
    """
    emoji = models.CharField(max_length=10, choices=EMOJI_CHOICES)
    reason = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        Returns a string representation of the Mood instance,
        displaying the emoji, a truncated reason, and the creation timestamp.
        """
        datetime_str = self.created_at.strftime("%Y-%m-%d %H:%M")
        return f"{self.emoji} - {self.reason[:20]} ({datetime_str})"
