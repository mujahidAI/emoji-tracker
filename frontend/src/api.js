

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
