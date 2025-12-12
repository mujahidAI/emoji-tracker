// frontend/src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import AddMood from "./pages/AddMood.jsx";
import EditMood from "./pages/EditMood.jsx";

import {
  fetchMoods,
  createMood,
  updateMood,
  deleteMood,
} from "./api.js";

function App() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMoods();
  }, []);

  async function loadMoods() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMoods();
      setMoods(data || []);
    } catch (err) {
      console.error("Failed to load moods:", err);
      setError(err.message || "Failed to load moods. Please try again.");
      setMoods([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateMood(mood) {
    try {
      setError(null);
      await createMood(mood);
      await loadMoods();
    } catch (err) {
      console.error("Failed to create mood:", err);
      setError(err.message || "Failed to create mood. Please try again.");
      throw err; // Re-throw so component can handle it
    }
  }

  async function handleUpdateMood(id, mood) {
    try {
      setError(null);
      await updateMood(id, mood);
      await loadMoods();
    } catch (err) {
      console.error("Failed to update mood:", err);
      setError(err.message || "Failed to update mood. Please try again.");
      throw err; // Re-throw so component can handle it
    }
  }

  async function handleDeleteMood(id) {
    try {
      setError(null);
      await deleteMood(id);
      await loadMoods();
    } catch (err) {
      console.error("Failed to delete mood:", err);
      setError(err.message || "Failed to delete mood. Please try again.");
      throw err; // Re-throw so component can handle it
    }
  }

  return (
    <div className={error ? "app-wrapper has-error-banner" : "app-wrapper"}>
      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="error-banner-close"
            aria-label="Close error message"
          >
            ×
          </button>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={<Home moods={moods} loading={loading} />}
        />
        <Route
          path="/add"
          element={<AddMood createMood={handleCreateMood} />}
        />
        <Route
          path="/moods/:id"
          element={
            <EditMood
              moods={moods}
              updateMood={handleUpdateMood}
              deleteMood={handleDeleteMood}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
