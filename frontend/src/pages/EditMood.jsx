// frontend/src/pages/EditMood.jsx
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodForm from "../components/MoodForm.jsx";

export default function EditMood({ moods, updateMood, deleteMood }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const mood = moods.find((m) => m.id === numericId);

  if (!mood) {
    return (
      <Layout title="Edit mood">
        <p>Mood not found.</p>
      </Layout>
    );
  }

  const handleSave = async (data) => {
    await updateMood(numericId, data);
    navigate("/");
  };

  const handleDelete = async () => {
    await deleteMood(numericId);
    navigate("/");
  };

  return (
    <Layout title="Edit mood">
      <MoodForm
        initialMood={mood}
        onSave={handleSave}
        onDelete={handleDelete}
        onCancel={() => navigate("/")}
      />
    </Layout>
  );
}
