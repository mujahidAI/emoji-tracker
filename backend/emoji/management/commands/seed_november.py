from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime
import random
from emoji.models import Mood, EMOJI_CHOICES


class Command(BaseCommand):
    help = "Seed 30 mood entries for November 2024 with random data."

    def add_arguments(self, parser):
        parser.add_argument(
            '--year',
            type=int,
            default=2024,
            help='Year to seed data for (default: 2024)'
        )
        parser.add_argument(
            '--month',
            type=int,
            default=11,
            help='Month to seed data for (default: 11 for November)'
        )

    def handle(self, *args, **options):
        YEAR = options['year']
        MONTH = options['month']
        
        # Determine days in month
        if MONTH in [1, 3, 5, 7, 8, 10, 12]:
            days_in_month = 31
        elif MONTH in [4, 6, 9, 11]:
            days_in_month = 30
        else:  # February
            days_in_month = 29 if YEAR % 4 == 0 and (YEAR % 100 != 0 or YEAR % 400 == 0) else 28

        # 1. Delete existing data for the specified month
        deleted = Mood.objects.filter(
            created_at__year=YEAR,
            created_at__month=MONTH
        ).delete()
        
        self.stdout.write(
            self.style.WARNING(
                f"Deleted {deleted[0]} existing entries for {YEAR}-{MONTH:02d}"
            )
        )

        # 2. Extract emoji values from choices
        emoji_values = [choice[0] for choice in EMOJI_CHOICES]
        
        # 3. Mood-specific reasons that match the emojis
        mood_reasons = {
            "😀": [
                "Had an amazing day",
                "Great news at work",
                "Spent time with loved ones",
                "Accomplished my goals",
            ],
            "🙂": [
                "Pretty good day overall",
                "Nice weather today",
                "Got some things done",
                "Feeling content",
            ],
            "😐": [
                "Just another day",
                "Nothing special happened",
                "Feeling neutral",
                "Meh kind of day",
            ],
            "😢": [
                "Feeling a bit down",
                "Stressful day at work",
                "Missing someone",
                "Things didn't go as planned",
            ],
            "😡": [
                "Frustrated with everything",
                "Had a terrible meeting",
                "Dealing with annoying issues",
                "Really upset today",
            ],
            "😴": [
                "Exhausted from work",
                "Didn't sleep well",
                "Need more coffee",
                "So tired today",
            ],
        }

        tz = timezone.get_current_timezone()
        created_count = 0

        for day in range(1, days_in_month + 1):
            emoji = random.choice(emoji_values)
            reason = random.choice(mood_reasons[emoji])
            
            # Randomize time for more realistic data
            hour = random.randint(8, 22)
            minute = random.randint(0, 59)
            second = random.randint(0, 59)
            
            naive_dt = datetime(YEAR, MONTH, day, hour, minute, second)
            aware_dt = timezone.make_aware(naive_dt, tz)
            
            # Note: We set created_at explicitly, but since your model has 
            # auto_now_add=True, you need to override it
            mood = Mood(
                emoji=emoji,
                reason=reason,
                created_at=aware_dt,
            )
            mood.save()
            
            created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"✅ Successfully seeded {created_count} mood entries for {YEAR}-{MONTH:02d}"
            )
        )