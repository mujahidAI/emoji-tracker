
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodList from "../components/MoodList.jsx";
import { fetchMoods } from "../api.js";
import { useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../api.js";

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);

  // Stores moods for the current page
  const [moods, setMoods] = useState([]);

  // Loading state for initial load and page switches
  const [loading, setLoading] = useState(true);

  // Fetch moods for a given page (or first page if no URL is passed)
  const loadPage = (currentPage) => {
    setLoading(true);
    fetchMoods(`${API_BASE_URL}/api/mood/?page=${currentPage}`).then((data) => {
      setMoods(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      setLoading(false);
    });
  };

  // Load first page on component mount
  useEffect(() => {
    loadPage(currentPage);
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage)
    setCurrentPage(currentPage + 1);
  setSearchParams({ page: currentPage + 1})
  }

  const goToPrevPage = () => {
    if (currentPage > 1)
    setCurrentPage(currentPage - 1);
  setSearchParams({page: currentPage - 1})
  }

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
            onSelectMood={(id) => navigate(`/moods/${id}/?page=${currentPage}`)}
          />

          {/* Pagination controls */}
          <div className="pagination">
            <button disabled={currentPage <= 1} onClick={() => goToPrevPage()}>
              Prev
            </button>
            <button disabled={currentPage >= totalPages} onClick={() => goToNextPage()}>
              Next
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}
