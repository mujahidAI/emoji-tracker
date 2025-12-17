/**
 * @fileoverview MoodList Component
 * This module provides a component for displaying a list of mood entries
 * in the React version of the Emoji Tracker application. It renders mood cards
 * with emoji, reason, and timestamp, and handles empty states.
 */

/**
 * MoodList Component
 * 
 * Displays a list of mood entries as clickable cards. Each card shows the mood emoji,
 * reason (if provided), and creation timestamp. Handles empty state when no moods exist.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.moods - Array of mood objects to display
 * @param {number} props.moods[].id - Unique identifier for the mood entry
 * @param {string} props.moods[].emoji - The emoji representing the mood
 * @param {string} [props.moods[].reason] - Optional reason or description for the mood
 * @param {string} [props.moods[].created_at] - ISO timestamp of when the mood was created
 * @param {Function} props.onSelectMood - Callback function called when a mood card is clicked
 * 
 * @returns {JSX.Element} A list of mood cards or an empty state message
 * 
 * @example
 * <MoodList
 *   moods={[
 *     { id: 1, emoji: "😀", reason: "Great day!", created_at: "2025-12-17T10:00:00Z" },
 *     { id: 2, emoji: "😢", reason: "Tough day", created_at: "2025-12-16T15:30:00Z" }
 *   ]}
 *   onSelectMood={(id) => navigate(`/edit/${id}`)}
 * />
 */
export default function MoodList({ moods, onSelectMood }) {
  if (!moods || moods.length === 0) {
    return <p className="empty-state">No moods yet. Add your first one 🤍</p>;
  }

  return (
    <div className="mood-list">
      {moods.map((mood) => (
        <button
          key={mood.id}
          className="mood-card"
          onClick={() => onSelectMood(mood.id)}
        >
          <div className="mood-emoji">{mood.emoji}</div>
          <div className="mood-text">
            <div className="mood-reason">
              {mood.reason || <span className="muted">No note</span>}
            </div>
            {mood.created_at && (
              <div className="mood-time">
                {new Date(mood.created_at).toLocaleString()}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
