// frontend/src/api.js

const BASE_URL = "http://127.0.0.1:8000"; // adjust if your backend URL is different

export async function fetchMoods() {
  const res = await fetch(`${BASE_URL}/api/mood/`);
  if (!res.ok) {
    throw new Error("Failed to fetch moods");
  }
  return res.json();
}

export async function createMood(data) {
  const res = await fetch(`${BASE_URL}/api/mood/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create mood");
  }
  return res.json();
}

export async function updateMood(id, data) {
  const res = await fetch(`${BASE_URL}/api/mood/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update mood");
  }
  return res.json();
}

export async function deleteMood(id) {
  const res = await fetch(`${BASE_URL}/api/mood/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete mood");
  }
}
