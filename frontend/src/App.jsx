/**
 * @fileoverview App Component
 * This is the main application component for the React version of the Emoji Tracker.
 * It manages global state for moods, handles routing, and provides CRUD operations
 * for mood entries. It also manages error states and displays error banners.
 */

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

/**
 * App Component
 * 
 * The root component of the Emoji Tracker application. Manages global state for mood entries,
 * provides routing between pages, and handles all CRUD operations for moods. Displays a
 * global error banner when API operations fail.
 * 
 * @component
 * @returns {JSX.Element} The main application with routing and error handling
 * 
 * @example
 * <App />
 */
function App() {
  /** @type {[Array, Function]} Array of all mood entries */
  const [moods, setMoods] = useState([]);

  /** @type {[boolean, Function]} Loading state for initial mood data fetch */
  const [loading, setLoading] = useState(true);

  /** @type {[string|null, Function]} Global error message state for displaying error banner */
  const [error, setError] = useState(null);

  /**
   * Loads mood data when the component mounts
   * 
   * This effect runs once on component mount to fetch the initial mood data.
   * 
   * @effect
   */
  useEffect(() => {
    loadMoods();
  }, []);


  /**
   * Loads all mood entries from the API
   * 
   * Fetches mood data from the backend and updates the component state.
   * Handles loading states and error messages.
   * 
   * @async
   * @returns {Promise<void>}
   */
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


  /**
   * Handles creating a new mood entry
   * 
   * Creates a new mood via the API and refreshes the mood list on success.
   * Re-throws errors so the calling component can handle them.
   * 
   * @async
   * @param {Object} mood - The mood data to create
   * @param {string} mood.emoji - The emoji representing the mood
   * @param {string} mood.reason - The reason or description for the mood
   * @returns {Promise<void>}
   * @throws {Error} Re-throws API errors for component-level handling
   */
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


  /**
   * Handles updating an existing mood entry
   * 
   * Updates a mood via the API and refreshes the mood list on success.
   * Re-throws errors so the calling component can handle them.
   * 
   * @async
   * @param {number} id - The ID of the mood entry to update
   * @param {Object} mood - The updated mood data
   * @param {string} mood.emoji - The emoji representing the mood
   * @param {string} mood.reason - The reason or description for the mood
   * @returns {Promise<void>}
   * @throws {Error} Re-throws API errors for component-level handling
   */
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


  /**
   * Handles deleting a mood entry
   * 
   * Deletes a mood via the API and refreshes the mood list on success.
   * Re-throws errors so the calling component can handle them.
   * 
   * @async
   * @param {number} id - The ID of the mood entry to delete
   * @returns {Promise<void>}
   * @throws {Error} Re-throws API errors for component-level handling
   */
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
