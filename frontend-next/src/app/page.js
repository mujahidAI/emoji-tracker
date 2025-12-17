"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    router.push(`/?page=${value}`);
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
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3, minHeight: '70vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
          Your Moods
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => router.push("/add-mood")}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd4 0%, #63408a 100%)',
            },
          }}
        >
          Add Mood
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Loading moods...
          </Typography>
        </Box>
      ) : (
        <>
          <MoodList
            moods={moods}
            onSelectMood={(id) =>
              router.push(`/edit-mood/${id}?page=${currentPage}`)
            }
          />

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, pt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Paper>
  );
}
