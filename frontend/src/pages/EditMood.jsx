import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodForm from "../components/MoodForm.jsx";
import { API_BASE_URL } from "../api.js";
/**
 * EditMood component for editing an existing mood entry.
 * It fetches the mood data based on the ID from the URL,
 * provides a form to update the mood, and handles deletion.
 * @param {object} props - The component props.
 * @param {function} props.updateMood - Function to call when updating a mood.
 * @param {function} props.deleteMood - Function to call when deleting a mood.
 */
export default function EditMood({ updateMood, deleteMood }) {
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get("page");
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const [mood, setMood] = useState(null); // ⬅️ mood is now local state
  const [isLoading, setIsLoading] = useState(true); // ⬅️ start loading
  const [error, setError] = useState("");

  // ⬅️ FETCH mood by ID 
  /**
   * Effect hook to fetch the mood data from the API when the component mounts
   * or when the numericId changes.
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
   * Handles saving the updated mood data.
   * Calls the `updateMood` prop function and navigates to the home page on success.
   * @param {object} data - The updated mood data.
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
   * Handles deleting the current mood.
   * Calls the `deleteMood` prop function and navigates to the home page on success.
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
