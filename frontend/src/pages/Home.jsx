// frontend/src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodList from "../components/MoodList.jsx";

export default function Home({ moods = [], loading = false }) {
  const navigate = useNavigate();

  return (
    <Layout title="Mood Tracker">
      <div className="home-header-row">
        <h2 className="section-title">Your moods</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add")}
          disabled={loading}
        >
          Add Mood
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading moods...</p>
        </div>
      ) : (
        <MoodList
          moods={moods}
          onSelectMood={(id) => navigate(`/moods/${id}`)}
        />
      )}
    </Layout>
  );
}
