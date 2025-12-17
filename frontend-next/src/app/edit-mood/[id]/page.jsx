/**
 * @fileoverview Edit Mood Page Component
 * This module provides a dynamic page for editing existing mood entries.
 * It handles fetching mood data by ID, updating mood information, and deleting moods.
 * Uses Next.js dynamic routing with [id] parameter.
 */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import MoodForm from "@/components/MoodForm";
import { updateMood, deleteMood, API_BASE_URL } from "@/lib/api";

/**
 * EditMood Component
 * 
 * A Next.js dynamic page component that allows users to edit or delete an existing mood entry.
 * This component fetches the mood data based on the URL parameter [id], manages form state,
 * handles API calls for updates and deletions, and provides user feedback through loading
 * states and error messages.
 * 
 * @component
 * @returns {JSX.Element} The edit mood page with form, loading states, and error handling UI
 * 
 * @example
 * // This component is automatically rendered when navigating to /edit-mood/[id]
 * // Usage in Next.js routing:
 * // app/edit-mood/[id]/page.jsx
 * // Example URL: /edit-mood/123?page=2
 */
export default function EditMood() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /** @type {string} The mood ID from the dynamic route parameter [id] */
  const { id } = useParams();

  /** @type {string|null} The current page number from query params for navigation */
  const page = searchParams.get("page");

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
   * Credentials are included for authentication.
   * 
   * @effect
   * @listens numericId - Re-fetches when the mood ID changes
   */
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/mood/${numericId}/`, {
      credentials: "include",
    })
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
    return <p>Loading mood...</p>;
  }

  // ⬅️ error state instead of blank screen
  if (!mood) {
    return (
      <>
        <div className="error-message">{error}</div>
        <button className="btn btn-primary" onClick={() => router.push("/")}>
          Go Home
        </button>
      </>
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
      router.push(`/?page=${page}`);
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
      router.push("/");
    } catch (err) {
      setError(err.message || "Failed to delete mood.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <div className="error-message">{error}</div>}

      <MoodForm
        initialMood={mood}
        onSave={handleSave}
        onDelete={handleDelete}
        onCancel={() => router.push("/")}
        isLoading={isLoading}
      />
    </>
  );
}
