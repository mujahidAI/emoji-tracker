// fronted/src/Home.jsx
import { useState } from "react";

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value; // fallback: show raw text
  return date.toLocaleString(); // you can customize format later
}

export default function Home({ moods = [] }) {
  const [isAddHover, setIsAddHover] = useState(false);

  const pageStyle = {
    fontFamily: "Arial, sans-serif",
    background: "#fcfcfc",
    color: "#222",
    margin: 0,
    minHeight: "100vh",
  };

  const titleStyle = {
    textAlign: "center",
    marginTop: "2em",
    fontSize: "2.3em",
    letterSpacing: "1px",
  };

  const listContainerStyle = {
    maxWidth: "500px",
    margin: "2em auto",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px #eee",
    padding: "1.2em 2em",
  };

  const listItemStyle = {
    marginBottom: "1.3em",
    borderBottom: "1px solid #f3f3f3",
    paddingBottom: "1em",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  };

  const emojiStyle = {
    fontSize: "2em",
    verticalAlign: "middle",
  };

  const reasonStyle = {
    marginLeft: "0.8em",
    fontWeight: 500,
  };

  const createdAtStyle = {
    color: "#888",
    fontSize: "0.93em",
    marginTop: "0.3em",
  };

  const addMoodWrapperStyle = {
    textAlign: "center",
    marginTop: "2em",
  };

  const addButtonStyle = {
    background: isAddHover ? "#ffe27a" : "#ffeca0",
    color: "#444",
    fontWeight: "bold",
    border: "none",
    padding: "0.8em 1.5em",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1.1em",
    boxShadow: "0 2px 8px #eee",
    transition: "background 0.2s",
  };

  // TODO: update these paths to match your actual Django URLs if different
  const handleAddMoodClick = () => {
    window.location.href = "/add-mood/"; // e.g. Django URL for add_mood
  };

  const getEditMoodHref = (moodId) => `/edit-mood/${moodId}/`; // e.g. Django URL for edit_mood

  return (
    <div style={pageStyle}>
      {/* Page Title */}
      <h1 style={titleStyle}>Emoji Tracker</h1>

      {/* Mood List Section */}
      <div style={listContainerStyle}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {moods.map((mood) => (
            <li key={mood.id} style={listItemStyle}>
              <a href={getEditMoodHref(mood.id)} style={linkStyle}>
                <span style={emojiStyle}>{mood.emoji}</span>

                <span style={reasonStyle}>{mood.reason}</span>

                <div style={createdAtStyle}>
                  🕒 Created at: {formatDateTime(mood.created_at)}
                </div>
              </a>
            </li>
          ))}

          {moods.length === 0 && (
            <li style={{ textAlign: "center", color: "#888", padding: "1em 0" }}>
              No moods yet. Add your first one!
            </li>
          )}
        </ul>
      </div>

      {/* Add Mood Button Section */}
      <div style={addMoodWrapperStyle}>
        <button
          type="button"
          style={addButtonStyle}
          onMouseEnter={() => setIsAddHover(true)}
          onMouseLeave={() => setIsAddHover(false)}
          onClick={handleAddMoodClick}
        >
          + Add Mood
        </button>
      </div>
    </div>
  );
}
