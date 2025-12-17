/**
 * @fileoverview Add Mood Page Component
 * This module provides a page for users to add a new mood entry to the tracker.
 * It handles form submission, loading states, and error handling for mood creation.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MoodForm from "@/components/MoodForm";
import { createMood } from "@/lib/api";

/**
 * AddMood Component
 * 
 * A Next.js page component that allows users to create and save a new mood entry.
 * This component manages the form state, handles API calls to save mood data,
 * and provides user feedback through loading states and error messages.
 * 
 * @component
 * @returns {JSX.Element} The add mood page with form and error handling UI
 * 
 * @example
 * // This component is automatically rendered when navigating to /add-mood
 * // Usage in Next.js routing:
 * // app/add-mood/page.jsx
 */
export default function AddMood() {
  const router = useRouter();

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
      router.push("/");
    } catch (err) {
      setError(err.message || "Failed to save mood. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <MoodForm
        initialMood={null}
        onSave={handleSave}
        onCancel={() => router.push("/")}
        isLoading={isLoading}
      />
    </>
  );
}
