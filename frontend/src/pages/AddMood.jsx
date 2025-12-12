// frontend/src/pages/AddMood.jsx
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodForm from "../components/MoodForm.jsx";

export default function AddMood({ createMood }) {
  const navigate = useNavigate();

  const handleSave = async (data) => {
    await createMood(data); // { emoji, reason }
    navigate("/");
  };

  return (
    <Layout title="Add mood">
      <MoodForm
        initialMood={null}
        onSave={handleSave}
        onCancel={() => navigate("/")}
      />
    </Layout>
  );
}
