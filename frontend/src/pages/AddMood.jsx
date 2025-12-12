// frontend/src/pages/AddMood.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodForm from "../components/MoodForm.jsx";

export default function AddMood({ createMood }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
