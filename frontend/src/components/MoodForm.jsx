// frontend/src/components/MoodForm.jsx
import { useState } from "react";

// 6 fixed mood emojis
const EMOJI_OPTIONS = ["😀", "🙂", "😐", "😢", "😡", "😴"];

export default function MoodForm({
  initialMood,
  onSave,
  onCancel,
  onDelete,
  isLoading = false,
}) {
  const [emoji, setEmoji] = useState(initialMood?.emoji || "");
  const [reason, setReason] = useState(initialMood?.reason || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!emoji.trim()) {
      setError("Please select a mood emoji.");
      return;
    }
     
    onSave({ emoji: emoji.trim(), reason: reason.trim() });
  };

  const handleDeleteClick = () => {
    if (!initialMood || !onDelete) return;
    const ok = window.confirm("Are you sure you want to delete this mood entry?");
    if (ok) {
      onDelete();
    }
  };

  return (
    <div className="mood-form">
      <h2 className="mood-form-title">
        {initialMood ? "Edit mood" : "Add today's mood"}
      </h2>
      <p className="mood-form-subtitle">
        Choose a mood emoji and write a short note about your day.
      </p>
  
      <form onSubmit={handleSubmit} className="mood-form-form">
        {/* Emoji Selection */}
        <div className="form-field">
          <label htmlFor="emoji" className="form-label">
            Mood Emoji <span className="required">*</span>
          </label>
          <div className="emoji-selector">
            {EMOJI_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={`emoji-option ${emoji === option ? "selected" : ""}`}
                onClick={() => {
                  setEmoji(option);
                  setError("");
                }}
                aria-label={`Select ${option} emoji`}
              >
                {option}
              </button>
            ))}
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>

        {/* Reason Textarea */}
        <div className="form-field">
          <label htmlFor="reason" className="form-label">
            Reason (optional)
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="form-textarea"
            placeholder="Why do you feel this way?"
            disabled={isLoading}
          />
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || !emoji.trim()}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      {/* Delete Button - only in edit mode */}
      {initialMood && onDelete && (
        <div className="form-delete-section">
          <button
            type="button"
            onClick={handleDeleteClick}
            className="btn btn-danger"
            disabled={isLoading}
          >
            Delete Entry
          </button>
        </div>
      )}
    </div>
  );
}
