
import { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodForm from "../components/MoodForm.jsx";
import { fetchMoods } from "../api.js"; // ⬅️ fetch single mood via API

export default function EditMood({ updateMood, deleteMood }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const [mood, setMood] = useState(null); // ⬅️ mood is now local state
  const [isLoading, setIsLoading] = useState(true); // ⬅️ start loading
  const [error, setError] = useState("");

  // ⬅️ FETCH mood by ID 
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/mood/${numericId}/`)
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

  const handleSave = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      await updateMood(numericId, data);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to update mood.");
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
