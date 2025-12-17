/**
 * @fileoverview API Utility Module
 * This module provides utility functions for making API calls to the Django backend.
 * It handles CSRF token management, response processing, error handling, and provides
 * functions for all CRUD operations on mood entries.
 */

/**
 * Retrieves a cookie value by name from the document cookies
 * 
 * This function is used to extract the CSRF token for authenticated requests.
 * It safely handles server-side rendering by checking for document availability.
 * 
 * @param {string} name - The name of the cookie to retrieve
 * @returns {string|null} The decoded cookie value, or null if not found
 * 
 * @example
 * const csrfToken = getCookie('csrftoken');
 */
function getCookie(name) {
  let cookieValue = null;
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.split("=")[1]);
        break;
      }
    }
  }
  return cookieValue;
}

/**
 * @constant {string} API_BASE_URL
 * The base URL for the backend API, loaded from environment variables.
 * Used as the prefix for all API endpoint calls.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Handles API response processing and error extraction
 * 
 * Processes fetch responses, extracts error messages from various response formats,
 * and handles both JSON and non-JSON responses. Throws descriptive errors for
 * failed requests.
 * 
 * @async
 * @param {Response} response - The fetch API response object
 * @returns {Promise<Object|null>} Parsed JSON data for successful requests, or null for empty responses
 * @throws {Error} Throws an error with a descriptive message if the request failed
 * 
 * @example
 * const data = await handleResponse(response);
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();
      // Try to extract meaningful error message from response
      if (errorData.detail) {
        errorMessage = errorData.detail;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      } else if (typeof errorData === "string") {
        errorMessage = errorData;
      }
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  // Handle empty responses (e.g., DELETE requests)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return null;
}


/**
 * Fetches mood entries from the API
 * 
 * Retrieves a list of mood entries, with support for pagination through the URL parameter.
 * Includes credentials for authentication.
 * 
 * @async
 * @param {string} [url=`${API_BASE_URL}/api/mood/`] - The API endpoint URL, defaults to the mood list endpoint
 * @returns {Promise<Object>} The API response containing mood data
 * @returns {Promise<Object.results>} Array of mood objects
 * @returns {Promise<Object.count>} Total count of mood entries
 * @throws {Error} Throws an error if the request fails or network is unavailable
 * 
 * @example
 * const data = await fetchMoods();
 * console.log(data.results); // Array of moods
 * 
 * @example
 * // Fetch specific page
 * const page2 = await fetchMoods(`${API_BASE_URL}/api/mood/?page=2`);
 */
export async function fetchMoods(url = `${API_BASE_URL}/api/mood/`) {
  try {
    const res = await fetch(url, { credentials: "include" });
    return await handleResponse(res);
  } catch (error) {
    if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("NetworkError")
    ) {
      throw new Error(
        "Unable to connect to server. Please check if the backend is running."
      );
    }
    throw error;
  }
}


/**
 * Creates a new mood entry
 * 
 * Sends a POST request to create a new mood entry with the provided data.
 * Automatically includes CSRF token for authentication.
 * 
 * @async
 * @param {Object} data - The mood data to create
 * @param {string} data.emoji - The emoji representing the mood
 * @param {string} data.reason - The reason or description for the mood
 * @returns {Promise<Object>} The created mood object from the API
 * @throws {Error} Throws an error if the request fails or network is unavailable
 * 
 * @example
 * const newMood = await createMood({ emoji: "😀", reason: "Great day!" });
 */
export async function createMood(data) {
  try {
    const csrfToken = getCookie("csrftoken");

    const res = await fetch(`${API_BASE_URL}/api/mood/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    return await handleResponse(res);
  } catch (error) {
    if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("NetworkError")
    ) {
      throw new Error(
        "Unable to connect to server. Please check if the backend is running."
      );
    }
    throw error;
  }
}


/**
 * Updates an existing mood entry
 * 
 * Sends a PATCH request to update a mood entry with the provided data.
 * Automatically includes CSRF token for authentication.
 * 
 * @async
 * @param {number} id - The ID of the mood entry to update
 * @param {Object} data - The updated mood data
 * @param {string} data.emoji - The emoji representing the mood
 * @param {string} data.reason - The reason or description for the mood
 * @returns {Promise<Object>} The updated mood object from the API
 * @throws {Error} Throws an error if the request fails, network is unavailable, or mood not found
 * 
 * @example
 * const updated = await updateMood(123, { emoji: "😢", reason: "Tough day" });
 */
export async function updateMood(id, data) {
  try {
    const csrfToken = getCookie("csrftoken");

    const res = await fetch(`${API_BASE_URL}/api/mood/${id}/`, {
      method: "PATCH", // ✅ IMPORTANT
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    return await handleResponse(res);
  } catch (error) {
    if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("NetworkError")
    ) {
      throw new Error(
        "Unable to connect to server. Please check if the backend is running."
      );
    }
    if (error.status === 404) {
      throw new Error("Mood entry not found. It may have been deleted.");
    }
    throw error;
  }
}


/**
 * Deletes a mood entry
 * 
 * Sends a DELETE request to remove a mood entry by ID.
 * Includes credentials for authentication.
 * 
 * @async
 * @param {number} id - The ID of the mood entry to delete
 * @returns {Promise<void>} Resolves when the deletion is successful
 * @throws {Error} Throws an error if the request fails, network is unavailable, or mood not found
 * 
 * @example
 * await deleteMood(123);
 */
export async function deleteMood(id) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/mood/${id}/`,
      { credentials: "include" },
      {
        method: "DELETE",
      }
    );
    await handleResponse(res);
  } catch (error) {
    if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("NetworkError")
    ) {
      throw new Error(
        "Unable to connect to server. Please check if the backend is running."
      );
    }
    if (error.status === 404) {
      throw new Error(
        "Mood entry not found. It may have already been deleted."
      );
    }
    throw error;
  }
}
