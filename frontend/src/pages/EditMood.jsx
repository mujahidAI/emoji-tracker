// frontend/src/pages/EditMood.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodForm from "../components/MoodForm.jsx";

export default function EditMood({ moods, updateMood, deleteMood }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const mood = moods.find((m) => m.id === numericId);

  if (!mood) {
    return (
      <Layout title="Edit mood">
        <div className="error-message">
          Mood not found. It may have been deleted.
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </Layout>
    );
  }

  const handleSave = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      await updateMood(numericId, data);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to update mood. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      setError("");
      await deleteMood(numericId);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to delete mood. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Edit mood">
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
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
