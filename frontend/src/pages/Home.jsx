import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodList from "../components/MoodList.jsx";
import { fetchMoods } from "../api.js";
import { API_BASE_URL } from "../api.js";

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPage = (page) => {
    setLoading(true);
    fetchMoods(`${API_BASE_URL}/api/mood/?page=${page}`).then((data) => {
      setMoods(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      setLoading(false);
    });
  };

  useEffect(() => {
    loadPage(currentPage);
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSearchParams({ page: currentPage + 1 });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSearchParams({ page: currentPage - 1 });
    }
  };

  return (
    <Layout title="Mood Tracker">
      <div className="home-header-row">
        <h2 className="section-title">Your moods</h2>

        <button className="btn btn-primary" onClick={() => navigate("/add")}>
          Add Mood
        </button>
      </div>

      {loading ? (
        <p>Loading moods...</p>
      ) : (
        <>
          {/* ❌ OLD LOGIC (kept) */}
          {/*
          <MoodList
            moods={moods}
            onSelectMood={(id) => navigate(`/moods/${id}/?page=${currentPage}`)}
          />
          */}

          {/* ✅ NEW LOGIC */}
          <MoodList
            moods={moods}
            onSelectMood={(id) => {
              localStorage.setItem(
                "editFrom",
                `/?page=${currentPage}` // ✅ FIXED (single ?)
              );

              navigate(`/moods/${id}/?page=${currentPage}`);
            }}
          />

          <div className="pagination">
            <button disabled={currentPage <= 1} onClick={goToPrevPage}>
              Prev
            </button>
            <button disabled={currentPage >= totalPages} onClick={goToNextPage}>
              Next
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}
