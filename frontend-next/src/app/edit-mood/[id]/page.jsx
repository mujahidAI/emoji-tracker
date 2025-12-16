"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import MoodForm from "@/components/MoodForm";
import { updateMood, deleteMood, API_BASE_URL } from "@/lib/api";

export default function EditMood() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();

  const page = searchParams.get("page");
  const numericId = Number(id);

  const [mood, setMood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // ⬅️ FETCH mood by ID (same logic as React)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/mood/${numericId}/`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Mood not found");
        return res.json();
      })
      .then((data) => {
        setMood(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Mood not found. It may have been deleted.");
        setIsLoading(false);
      });
  }, [numericId]);

  // ⬅️ loading guard
  if (isLoading) {
    return <p>Loading mood...</p>;
  }

  // ⬅️ error state instead of blank screen
  if (!mood) {
    return (
      <>
        <div className="error-message">{error}</div>
        <button className="btn btn-primary" onClick={() => router.push("/")}>
          Go Home
        </button>
      </>
    );
  }

  // ⬅️ save handler (unchanged behavior)
  const handleSave = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      await updateMood(numericId, data);
      router.push(`/?page=${page}`);
    } catch (err) {
      setError(err.message || "Failed to update mood.");
      setIsLoading(false);
    }
  };

  // ⬅️ delete handler (unchanged behavior)
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      setError("");
      await deleteMood(numericId);
      router.push("/");
    } catch (err) {
      setError(err.message || "Failed to delete mood.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <div className="error-message">{error}</div>}

      <MoodForm
        initialMood={mood}
        onSave={handleSave}
        onDelete={handleDelete}
        onCancel={() => router.push("/")}
        isLoading={isLoading}
      />
    </>
  );
}
