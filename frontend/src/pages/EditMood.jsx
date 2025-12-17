/**
 * @fileoverview EditMood Page Component
 * This module provides a page for editing existing mood entries in the React version
 * of the Emoji Tracker application. It handles fetching mood data by ID, updating
 * mood information, and deleting moods.
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodForm from "../components/MoodForm.jsx";
import { API_BASE_URL } from "../api.js";

/**
 * EditMood Page Component
 * 
 * A page component that allows users to edit or delete an existing mood entry.
 * This component fetches the mood data based on the URL parameter ID, manages form state,
 * handles API calls for updates and deletions, and provides user feedback through loading
 * states and error messages.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.updateMood - Function to update an existing mood entry via API
 * @param {Function} props.deleteMood - Function to delete a mood entry via API
 * 
 * @returns {JSX.Element} The edit mood page with form, loading states, and error handling UI
 * 
 * @example
 * <EditMood
 *   updateMood={(id, data) => api.updateMood(id, data)}
 *   deleteMood={(id) => api.deleteMood(id)}
 * />
 */
export default function EditMood({ updateMood, deleteMood }) {
  const [searchParams, _] = useSearchParams();

  /** @type {string|null} The current page number from query params for navigation */
  const page = searchParams.get("page");

  /** @type {string} The mood ID from the URL parameter */
  const { id } = useParams();

  const navigate = useNavigate();

  /** @type {number} Converted mood ID as a number for API calls */
  const numericId = Number(id);

  /** @type {[Object|null, Function]} The fetched mood data object */
  const [mood, setMood] = useState(null);

  /** @type {[boolean, Function]} Loading state for async operations */
  const [isLoading, setIsLoading] = useState(true);

  /** @type {[string, Function]} Error message state for displaying API errors */
  const [error, setError] = useState("");

  /**
   * Fetches the mood data from the API when the component mounts or when the ID changes
   * 
   * This effect runs on component mount and whenever the numericId changes.
   * It fetches the mood data from the backend API using the mood ID from the URL.
   * 
   * @effect
   * @listens numericId - Re-fetches when the mood ID changes
   */
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/mood/${numericId}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Mood not found");
        return res.json();
      })
      .then((data) => {
        setMood(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Mood not found. It may have been deleted.");
        setIsLoading(false);
      });
  }, [numericId]);

  // ⬅️ loading guard
  if (isLoading) {
    return (
      <Layout title="Edit mood">
        <p>Loading mood...</p>
      </Layout>
    );
  }

  // ⬅️ error state instead of blank screen
  if (!mood) {
    return (
      <Layout title="Edit mood">
        <div className="error-message">{error}</div>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </Layout>
    );
  }

  /**
   * Handles the mood form submission for updating an existing mood
   * 
   * This async function processes the updated mood data from the form,
   * sends it to the API, and navigates back to the home page on success.
   * Preserves the current page number in the navigation.
   * 
   * @async
   * @param {Object} data - The updated mood data from the form
   * @param {string} data.emoji - The emoji representing the user's mood
   * @param {string} data.reason - The reason or description for the mood
   * @returns {Promise<void>} Resolves when the mood is updated and navigation occurs
   * @throws {Error} Displays error message if mood update fails
   */
  const handleSave = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      await updateMood(numericId, data);
      navigate(`/?page=${page}`);
    } catch (err) {
      setError(err.message || "Failed to update mood.");
      setIsLoading(false);
    }
  };

  /**
   * Handles the deletion of the current mood entry
   * 
   * This async function sends a delete request to the API for the current mood
   * and navigates back to the home page on success. On failure, it displays
   * an error message and re-enables the form.
   * 
   * @async
   * @returns {Promise<void>} Resolves when the mood is deleted and navigation occurs
   * @throws {Error} Displays error message if mood deletion fails
   */
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      setError("");
      await deleteMood(numericId);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to delete mood.");
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Edit mood">
      {error && <div className="error-message">{error}</div>}

      <MoodForm
        initialMood={mood}
        onSave={handleSave}
        onDelete={handleDelete}
        onCancel={() => navigate("/")}
        isLoading={isLoading}
      />
    </Layout>
  );
}
