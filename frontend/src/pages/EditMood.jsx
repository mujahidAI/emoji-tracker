import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodForm from "../components/MoodForm.jsx";
import { API_BASE_URL } from "../api.js";

export default function EditMood({ updateMood, deleteMood }) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const [mood, setMood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ MOVED INSIDE COMPONENT
  const fromPage = localStorage.getItem("editFrom");

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

  if (isLoading) {
    return (
      <Layout title="Edit mood">
        <p>Loading mood...</p>
      </Layout>
    );
  }

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

      // ❌ OLD LOGIC (preserved)
      // navigate(`/?page=${page}`);

      // ✅ NEW LOGIC
      if (fromPage) {
        navigate(fromPage);
        localStorage.removeItem("editFrom");
      } else {
        navigate("/");
      }
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

      // ❌ OLD LOGIC (preserved)
      // navigate("/");

      // ✅ NEW LOGIC
      if (fromPage) {
        navigate(fromPage);
        localStorage.removeItem("editFrom");
      } else {
        navigate("/");
      }
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
        // ❌ OLD LOGIC
        // onCancel={() => navigate("/")}

        // ✅ NEW LOGIC
        onCancel={() => {
          if (fromPage) {
            navigate(fromPage);
            localStorage.removeItem("editFrom");
          } else {
            navigate("/");
          }
        }}
        isLoading={isLoading}
      />
    </Layout>
  );
}
