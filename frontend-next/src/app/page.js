/**
 * @fileoverview Home Page Component
 * This module provides the main landing page for the Emoji Tracker application.
 * It displays a paginated list of mood entries with navigation controls and
 * handles fetching mood data from the backend API.
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MoodList from "@/components/MoodList";
import { fetchMoods, API_BASE_URL } from "@/lib/api";

/**
 * Home Component
 * 
 * The main page component that displays a paginated list of user mood entries.
 * This component manages pagination state, fetches mood data from the API,
 * and provides navigation controls for browsing through mood history.
 * 
 * @component
 * @returns {JSX.Element} The home page with mood list, pagination controls, and add mood button
 * 
 * @example
 * // This component is automatically rendered at the root route
 * // Usage in Next.js routing:
 * // app/page.js
 * // Example URLs: /, /?page=1, /?page=2
 */
export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /** @type {number} Initial page number from URL query params, defaults to 1 */
  const initialPage = parseInt(searchParams.get("page")) || 1;

  /** @type {[number, Function]} Current page number for pagination */
  const [currentPage, setCurrentPage] = useState(initialPage);

  /** @type {[number, Function]} Total number of pages available */
  const [totalPages, setTotalPages] = useState(1);

  /** @type {[Array, Function]} Array of mood objects for the current page */
  const [moods, setMoods] = useState([]);

  /** @type {[boolean, Function]} Loading state while fetching mood data */
  const [loading, setLoading] = useState(true);

  /**
   * Navigates to the next page of moods
   * 
   * Increments the current page number and updates the URL query parameter.
   * Only navigates if there are more pages available.
   * 
   * @function
   * @returns {void}
   */
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const next = currentPage + 1;
      setCurrentPage(next);
      router.push(`/?page=${next}`);
    }
  };

  /**
   * Navigates to the previous page of moods
   * 
   * Decrements the current page number and updates the URL query parameter.
   * Only navigates if not already on the first page.
   * 
   * @function
   * @returns {void}
   */
  const goToPrevPage = () => {
    if (currentPage > 1) {
      const prev = currentPage - 1;
      setCurrentPage(prev);
      router.push(`/?page=${prev}`);
    }
  };

  /**
   * Loads mood data for a specific page from the API
   * 
   * Fetches mood entries for the given page number and updates the component state
   * with the results. Calculates total pages based on the count returned from the API
   * (assuming 10 items per page).
   * 
   * @async
   * @param {number} page - The page number to load
   * @returns {void}
   */
  const loadPage = (page) => {
    setLoading(true);

    fetchMoods(`${API_BASE_URL}/api/mood/?page=${page}`).then((data) => {
      setMoods(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      setLoading(false);
    });
  };

  /**
   * Loads mood data when the component mounts or when the current page changes
   * 
   * This effect triggers a data fetch whenever the currentPage state changes,
   * ensuring the displayed moods are always in sync with the current page.
   * 
   * @effect
   * @listens currentPage - Re-fetches mood data when the page number changes
   */
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
