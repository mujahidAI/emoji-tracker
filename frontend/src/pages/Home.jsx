
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodList from "../components/MoodList.jsx";
import { fetchMoods } from "../api.js";

export default function Home() {
  const navigate = useNavigate();

  // Stores moods for the current page
  const [moods, setMoods] = useState([]);

  // Pagination URLs returned by DRF
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  // Loading state for initial load and page switches
  const [loading, setLoading] = useState(true);

  // Fetch moods for a given page (or first page if no URL is passed)
  const loadPage = (url) => {
    setLoading(true);
    fetchMoods(url).then((data) => {
      // DRF paginated response
      setMoods(data.results);
      setNext(data.next);
      setPrev(data.previous);
      setLoading(false);
    });
  };

  // Load first page on component mount
  useEffect(() => {
    loadPage();
  }, []);

  return (
    <Layout title="Mood Tracker">
      <div className="home-header-row">
        <h2 className="section-title">Your moods</h2>

        {/* Navigate to Add Mood page */}
        <button className="btn btn-primary" onClick={() => navigate("/add")}>
          Add Mood
        </button>
      </div>

      {/* Show loader while fetching data */}
      {loading ? (
        <p>Loading moods...</p>
      ) : (
        <>
          {/* Mood list for current page */}
          <MoodList
            moods={moods}
            onSelectMood={(id) => navigate(`/moods/${id}`)}
          />

          {/* Pagination controls */}
          <div className="pagination">
            <button disabled={!prev} onClick={() => loadPage(prev)}>
              Prev
            </button>
            <button disabled={!next} onClick={() => loadPage(next)}>
              Next
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}
