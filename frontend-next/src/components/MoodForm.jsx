import { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

// 6 fixed mood emojis
const EMOJI_OPTIONS = ["😀", "🙂", "😐", "😢", "😡", "😴"];

export default function MoodForm({
  initialMood,
  onSave,
  onCancel,
  onDelete,
  isLoading = false,
}) {
  const [emoji, setEmoji] = useState(initialMood?.emoji || "");
  const [reason, setReason] = useState(initialMood?.reason || "");
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!emoji.trim()) {
      setError("Please select a mood emoji.");
      return;
    }

    onSave({ emoji: emoji.trim(), reason: reason.trim() });
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    if (onDelete) {
      onDelete();
    }
  };

  const handleEmojiChange = (event, newEmoji) => {
    if (newEmoji !== null) {
      setEmoji(newEmoji);
      setError("");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          {initialMood ? "Edit mood" : "Add today's mood"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Choose a mood emoji and write a short note about your day.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Emoji Selection */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
                Mood Emoji <span style={{ color: '#e74c3c' }}>*</span>
              </Typography>
              <ToggleButtonGroup
                value={emoji}
                exclusive
                onChange={handleEmojiChange}
                aria-label="mood emoji"
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  '& .MuiToggleButton-root': {
                    fontSize: '2rem',
                    width: 70,
                    height: 70,
                    border: '2px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    '&.Mui-selected': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.light',
                      '&:hover': {
                        bgcolor: 'primary.light',
                      },
                    },
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s',
                    },
                  },
                }}
              >
                {EMOJI_OPTIONS.map((option) => (
                  <ToggleButton key={option} value={option} aria-label={`${option} emoji`}>
                    {option}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </Box>

            {/* Reason TextField */}
            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Reason (optional)"
                placeholder="Why do you feel this way?"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={isLoading}
                variant="outlined"
              />
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={isLoading}
                size="large"
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                disabled={!emoji.trim()}
                size="large"
              >
                {isLoading ? "Saving..." : "Save"}
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>

        {/* Delete Button - only in edit mode */}
        {initialMood && onDelete && (
          <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}
              disabled={isLoading}
              size="large"
            >
              Delete Entry
            </Button>
          </Box>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Mood Entry?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this mood entry? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  );
}
