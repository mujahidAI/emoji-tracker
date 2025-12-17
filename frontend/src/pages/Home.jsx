/**
 * @fileoverview Home Page Component
 * This module provides the main landing page for the React version of the
 * Emoji Tracker application. It displays a paginated list of mood entries
 * with navigation controls and handles fetching mood data from the backend API.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import MoodList from "../components/MoodList.jsx";
import { fetchMoods } from "../api.js";
import { useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../api.js";

/**
 * Home Page Component
 * 
 * The main page component that displays a paginated list of user mood entries.
 * This component manages pagination state, fetches mood data from the API,
 * and provides navigation controls for browsing through mood history.
 * 
 * @component
 * @returns {JSX.Element} The home page with mood list, pagination controls, and add mood button
 * 
 * @example
 * <Home />
 */
export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /** @type {[number, Function]} Current page number for pagination, initialized from URL or defaults to 1 */
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);

  /** @type {[number, Function]} Total number of pages available */
  const [totalPages, setTotalPages] = useState(1);

  /** @type {[Array, Function]} Array of mood objects for the current page */
  const [moods, setMoods] = useState([]);

  /** @type {[boolean, Function]} Loading state while fetching mood data */
  const [loading, setLoading] = useState(true);


  /**
   * Loads mood data for a specific page from the API
   * 
   * Fetches mood entries for the given page number and updates the component state
   * with the results. Calculates total pages based on the count returned from the API
   * (assuming 10 items per page).
   * 
   * @param {number} currentPage - The page number to load
   * @returns {void}
   */
  const loadPage = (currentPage) => {
    setLoading(true);
    fetchMoods(`${API_BASE_URL}/api/mood/?page=${currentPage}`).then((data) => {
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


  /**
   * Navigates to the next page of moods
   * 
   * Increments the current page number and updates both the component state
   * and the URL query parameter.
   * 
   * @function
   * @returns {void}
   */
  const goToNextPage = () => {
    if (currentPage)
      setCurrentPage(currentPage + 1);
    setSearchParams({ page: currentPage + 1 })
  }


  /**
   * Navigates to the previous page of moods
   * 
   * Decrements the current page number and updates both the component state
   * and the URL query parameter. Only navigates if not already on the first page.
   * 
   * @function
   * @returns {void}
   */
  const goToPrevPage = () => {
    if (currentPage > 1)
      setCurrentPage(currentPage - 1);
    setSearchParams({ page: currentPage - 1 })
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
