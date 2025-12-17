/**
 * Base URL for the API, loaded from environment variables.
 * @type {string}
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Handles API responses, checking for errors and parsing JSON.
 * @param {Response} response - The fetch API Response object.
 * @returns {Promise<any | null>} A promise that resolves with the parsed JSON data or null if the response body is empty.
 * @throws {Error} Throws an error if the response status is not OK, with a detailed message.
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
 * Fetches a list of mood entries from the API.
 * @param {string} [url=`${API_BASE_URL}/api/mood/`] - The URL to fetch moods from.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of mood objects.
 * @throws {Error} Throws an error if there's a network issue or a server error.
 */
export async function fetchMoods(url = `${API_BASE_URL}/api/mood/`) {
  try {
    const res = await fetch(url);
    return await handleResponse(res);
  } catch (error) {
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("Unable to connect to server. Please check if the backend is running.");
    }
    throw error;
  }
}

/**
 * Creates a new mood entry in the API.
 * @param {Object} data - The data for the new mood entry.
 * @returns {Promise<Object>} A promise that resolves with the newly created mood object.
 * @throws {Error} Throws an error if there's a network issue or a server error.
 */
export async function createMood(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/mood/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("Unable to connect to server. Please check if the backend is running.");
    }
    throw error;
  }
}

/**
 * Updates an existing mood entry in the API.
 * @param {string | number} id - The ID of the mood entry to update.
 * @param {Object} data - The updated data for the mood entry.
 * @returns {Promise<Object>} A promise that resolves with the updated mood object.
 * @throws {Error} Throws an error if there's a network issue, a server error, or if the mood entry is not found (404).
 */
export async function updateMood(id, data) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/mood/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("Unable to connect to server. Please check if the backend is running.");
    }
    if (error.status === 404) {
      throw new Error("Mood entry not found. It may have been deleted.");
    }
    throw error;
  }
}

/**
 * Deletes a mood entry from the API.
 * @param {string | number} id - The ID of the mood entry to delete.
 * @returns {Promise<void>} A promise that resolves when the mood entry has been successfully deleted.
 * @throws {Error} Throws an error if there's a network issue, a server error, or if the mood entry is not found (404).
 */
export async function deleteMood(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/mood/${id}/`, {
      method: "DELETE",
    });
    await handleResponse(res);
  } catch (error) {
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("Unable to connect to server. Please check if the backend is running.");
    }
    if (error.status === 404) {
      throw new Error("Mood entry not found. It may have already been deleted.");
    }
    throw error;
  }
}
