// frontend/src/api.js

// Use your exact backend host + port
const BASE_URL = "http://127.0.0.1:8000";

export async function fetchMoods() {
  const res = await fetch(`${BASE_URL}/api/mood/`);
  if (!res.ok) throw new Error("Failed to fetch moods");
  return res.json();
}

export async function createMood(data) {
  const res = await fetch(`${BASE_URL}/api/mood/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create mood");
  return res.json();
}

// These two assume you also have detail endpoints like /api/mood/<id>/
export async function updateMood(id, data) {
  const res = await fetch(`${BASE_URL}/api/mood/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update mood");
  return res.json();
}

export async function deleteMood(id) {
  const res = await fetch(`${BASE_URL}/api/mood/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete mood");
}
