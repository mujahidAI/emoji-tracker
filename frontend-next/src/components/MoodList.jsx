import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function MoodList({ moods, onSelectMood }) {
  if (!moods || moods.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No moods yet 🤍
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Add your first mood to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {moods.map((mood, index) => (
        <Fade in={true} timeout={300 + index * 100} key={mood.id}>
          <Card elevation={2}>
            <CardActionArea onClick={() => onSelectMood(mood.id)}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h2" sx={{ fontSize: '3rem', lineHeight: 1 }}>
                    {mood.emoji}
                  </Typography>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        mb: 0.5,
                        color: mood.reason ? 'text.primary' : 'text.secondary',
                        fontStyle: mood.reason ? 'normal' : 'italic'
                      }}
                    >
                      {mood.reason || 'No note'}
                    </Typography>

                    {mood.created_at && (
                      <Chip
                        icon={<AccessTimeIcon />}
                        label={new Date(mood.created_at).toLocaleString()}
                        size="small"
                        variant="outlined"
                        sx={{ mt: 0.5 }}
                      />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Fade>
      ))}
    </Stack>
  );
}
