"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import MoodForm from "@/components/MoodForm";
import { createMood } from "@/lib/api";

export default function AddMood() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      await createMood(data); // { emoji, reason }
      router.push("/");
    } catch (err) {
      setError(err.message || "Failed to save mood. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <MoodForm
        initialMood={null}
        onSave={handleSave}
        onCancel={() => router.push("/")}
        isLoading={isLoading}
      />
    </Box>
  );
}
