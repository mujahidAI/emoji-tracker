/**
 * @fileoverview MoodForm Component
 * This module provides a reusable form component for creating and editing mood entries.
 * It handles emoji selection, reason input, form validation, and delete functionality.
 * Used by both the add-mood and edit-mood pages.
 */

import { useState } from "react";

/**
 * @constant {string[]} EMOJI_OPTIONS
 * Array of predefined emoji options for mood selection.
 * Users can choose from 6 different mood states ranging from happy to sleepy.
 */
const EMOJI_OPTIONS = ["😀", "🙂", "😐", "😢", "😡", "😴"];

/**
 * MoodForm Component
 * 
 * A reusable form component for creating and editing mood entries.
 * Provides emoji selection, reason input, validation, and optional delete functionality.
 * The form adapts its behavior based on whether it's in create or edit mode.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object|null} props.initialMood - Initial mood data for edit mode, null for create mode
 * @param {string} props.initialMood.emoji - The emoji representing the mood
 * @param {string} props.initialMood.reason - The reason or description for the mood
 * @param {Function} props.onSave - Callback function called when the form is submitted
 * @param {Function} props.onCancel - Callback function called when the cancel button is clicked
 * @param {Function} [props.onDelete] - Optional callback function for deleting the mood entry
 * @param {boolean} [props.isLoading=false] - Loading state to disable form during async operations
 * 
 * @returns {JSX.Element} The mood form with emoji selector, reason textarea, and action buttons
 * 
 * @example
 * // Create mode
 * <MoodForm
 *   initialMood={null}
 *   onSave={(data) => createMood(data)}
 *   onCancel={() => router.push("/")}
 *   isLoading={false}
 * />
 * 
 * @example
 * // Edit mode
 * <MoodForm
 *   initialMood={{ emoji: "😀", reason: "Great day!" }}
 *   onSave={(data) => updateMood(id, data)}
 *   onCancel={() => router.push("/")}
 *   onDelete={() => deleteMood(id)}
 *   isLoading={false}
 * />
 */
export default function MoodForm({
  initialMood,
  onSave,
  onCancel,
  onDelete,
  isLoading = false,
}) {
  /** @type {[string, Function]} Selected emoji state, initialized from initialMood or empty */
  const [emoji, setEmoji] = useState(initialMood?.emoji || "");

  /** @type {[string, Function]} Reason text state, initialized from initialMood or empty */
  const [reason, setReason] = useState(initialMood?.reason || "");

  /** @type {[string, Function]} Validation error message state */
  const [error, setError] = useState("");

  /**
   * Handles form submission
   * 
   * Validates that an emoji is selected, then calls the onSave callback
   * with the trimmed emoji and reason data. Prevents default form submission.
   * 
   * @param {Event} e - The form submit event
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!emoji.trim()) {
      setError("Please select a mood emoji.");
      return;
    }

    onSave({ emoji: emoji.trim(), reason: reason.trim() });
  };

  /**
   * Handles the delete button click
   * 
   * Shows a confirmation dialog before calling the onDelete callback.
   * Only available in edit mode when initialMood and onDelete are provided.
   * 
   * @returns {void}
   */
  const handleDeleteClick = () => {
    if (!initialMood || !onDelete) return;
    const ok = window.confirm(
      "Are you sure you want to delete this mood entry?"
    );
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
