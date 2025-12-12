// frontend/src/components/MoodForm.jsx
import { useState } from "react";

// 6 fixed mood emojis
const EMOJI_OPTIONS = ["😀", "🙂", "😐", "😢", "😡", "😴"];

export default function MoodForm({
  initialMood,
  onSave,
  onCancel,
  onDelete,
}) {
  const [emoji, setEmoji] = useState(initialMood?.emoji || "");
  const [reason, setReason] = useState(initialMood?.reason || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emoji) {
      alert("Please select a mood emoji.");
      return;
    }
    onSave({ emoji, reason });
  };

  const handleDeleteClick = () => {
    if (!initialMood || !onDelete) return;
    const ok = window.confirm("Delete this mood entry?");
    if (ok) onDelete(initialMood.id);
  };

  return (
    <div style={cardStyle}>
      {/* same inner content as before */}
      <h2 style={titleStyle}>
        {initialMood ? "Edit mood" : "Add today’s mood"}
      </h2>
      <p style={subtitleStyle}>
        Choose a mood emoji and write a short note about your day.
      </p>
  
      <form onSubmit={handleSubmit}>
        {/* ...rest of the form stays the same ... */}
      </form>
    </div>
  );
  
}
