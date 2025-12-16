// frontend/src/components/MoodList.jsx
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
