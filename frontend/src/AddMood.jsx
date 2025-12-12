// fronted/src/AddMood.jsx
import { useEffect, useRef, useState } from "react";
import "emoji-picker-element";

export default function AddMood({
  initialEmoji = "",
  initialReason = "",
  moodId = null, // pass an id when editing to show Delete button
}) {
  const [emoji, setEmoji] = useState(initialEmoji);
  const [reason, setReason] = useState(initialReason);
  const [showPicker, setShowPicker] = useState(false);

  const emojiInputRef = useRef(null);
  const pickerRef = useRef(null);
  const wrapperRef = useRef(null);

  // Attach emoji-click event once
  useEffect(() => {
    const picker = pickerRef.current;
    if (!picker) return;

    const handleEmojiClick = (event) => {
      const selectedEmoji = event.detail.unicode;
      setEmoji(selectedEmoji);
      setShowPicker(false);
    };

    picker.addEventListener("emoji-click", handleEmojiClick);

    return () => {
      picker.removeEventListener("emoji-click", handleEmojiClick);
    };
  }, []);

  // Hide picker when clicking outside input + picker
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace this with a real POST/PUT to your Django backend
    console.log("Save mood:", { emoji, reason, moodId });
    alert("Form submitted (check console). Hook this up to your Django API.");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (!moodId) return;
    // TODO: Replace this with a real DELETE to your Django backend
    console.log("Delete mood with id:", moodId);
    alert("Delete clicked (check console). Hook this up to your Django API.");
  };

  // === Styles ===
  const pageStyle = {
    fontFamily: "Arial, sans-serif",
    background: "#fcfcfc",
    color: "#222",
    margin: 0,
    minHeight: "100vh",
    padding: "2rem",
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px #eee",
    padding: "1.5rem 2rem",
  };

  const fieldWrapperStyle = {
    marginTop: "10px",
  };

  const emojiWrapperStyle = {
    position: "relative",
    marginTop: "10px",
  };

  const pickerContainerStyle = {
    display: showPicker ? "block" : "none",
    position: "absolute",
    zIndex: 1000,
    marginTop: "8px",
    left: 0,
    right: 0,
  };

  const saveButtonStyle = {
    marginTop: "10px",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    background: "#4CAF50",
    color: "white",
    fontWeight: "bold",
  };

  const deleteButtonStyle = {
    marginTop: "10px",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    background: "red",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={pageStyle}>
      <h1>Add today&apos;s mood</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Emoji field + picker */}
        <div ref={wrapperRef}>
          <label htmlFor="emoji">Emoji:</label>
          <div style={emojiWrapperStyle}>
            <input
              id="emoji"
              ref={emojiInputRef}
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              onFocus={() => setShowPicker(true)}
              onClick={() => setShowPicker(true)}
              style={{ width: "100%", padding: "0.4rem" }}
              placeholder="Click to choose emoji"
            />

            <div style={pickerContainerStyle}>
              {/* web component from emoji-picker-element */}
              <emoji-picker ref={pickerRef}></emoji-picker>
            </div>
          </div>
        </div>

        {/* Reason field */}
        <div style={fieldWrapperStyle}>
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            style={{ width: "100%", padding: "0.4rem", resize: "vertical" }}
            placeholder="Why do you feel this way?"
          />
        </div>

        <button type="submit" style={saveButtonStyle}>
          Save
        </button>
      </form>

      {/* Delete section – only if moodId is provided (edit mode) */}
      {moodId && (
        <form onSubmit={handleDelete} style={{ maxWidth: "500px", margin: "1rem auto 0" }}>
          <button type="submit" style={deleteButtonStyle}>
            Delete
          </button>
        </form>
      )}
    </div>
  );
}
