/**
 * @fileoverview AddMood Page Component
 * This module provides a page for creating new mood entries in the React version
 * of the Emoji Tracker application. It handles form submission, loading states,
 * and error handling for mood creation.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodForm from "../components/MoodForm.jsx";

/**
 * AddMood Page Component
 * 
 * A page component that allows users to create and save a new mood entry.
 * This component manages the form state, handles API calls to save mood data,
 * and provides user feedback through loading states and error messages.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.createMood - Function to create a new mood entry via API
 * 
 * @returns {JSX.Element} The add mood page with form and error handling UI
 * 
 * @example
 * <AddMood createMood={(data) => api.createMood(data)} />
 */
export default function AddMood({ createMood }) {
  const navigate = useNavigate();

  /** @type {[boolean, Function]} Loading state to disable form during submission */
  const [isLoading, setIsLoading] = useState(false);

  /** @type {[string, Function]} Error message state for displaying API errors */
  const [error, setError] = useState("");

  /**
   * Handles the mood form submission
   * 
   * This async function processes the mood data from the form, sends it to the API,
   * and handles navigation on success or displays errors on failure.
   * 
   * @async
   * @param {Object} data - The mood data from the form
   * @param {string} data.emoji - The emoji representing the user's mood
   * @param {string} data.reason - The reason or description for the mood
   * @returns {Promise<void>} Resolves when the mood is saved and navigation occurs
   * @throws {Error} Displays error message if mood creation fails
   */
  const handleSave = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      await createMood(data); // { emoji, reason }
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to save mood. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Add mood">
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      <MoodForm
        initialMood={null}
        onSave={handleSave}
        onCancel={() => navigate("/")}
        isLoading={isLoading}
      />
    </Layout>
  );
}
