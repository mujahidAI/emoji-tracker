"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MoodList from "@/components/MoodList";
import { fetchMoods, API_BASE_URL } from "@/lib/api";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const next = currentPage + 1;
      setCurrentPage(next);
      router.push(`/?page=${next}`);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      const prev = currentPage - 1;
      setCurrentPage(prev);
      router.push(`/?page=${prev}`);
    }
  };

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

  return (
    <>
      <div className="home-header-row">
        <h2 className="section-title">Your moods</h2>

        <button
          className="btn btn-primary"
          onClick={() => router.push("/add-mood")}
        >
          Add Mood
        </button>
      </div>

      {loading ? (
        <p>Loading moods...</p>
      ) : (
        <>
          <MoodList
            moods={moods}
            onSelectMood={(id) =>
              router.push(`/edit-mood/${id}?page=${currentPage}`)
            }
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
    </>
  );
}
