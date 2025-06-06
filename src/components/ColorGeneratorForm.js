import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ColorGeneratorForm = ({ onSubmit, loading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        maxWidth: 800,
        mx: 'auto',
        mb: 4,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid rgba(132, 169, 140, 0.1)',
        borderRadius: 2,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(90deg, #b39ddb 0%, #f8bbd0 100%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          AI Color Palette Generator
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Describe the mood, theme, or style you want for your color palette. This AI will generate a palette for you! :)
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        <TextField
          fullWidth
          label="Describe your palette"
          variant="outlined"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="For example, A calming forest theme with sage greens"
          disabled={loading}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PaletteIcon sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !prompt.trim()}
          startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
          sx={{
            minWidth: { xs: '100%', sm: 'auto' },
            height: 56,
            px: 4,
            background: 'linear-gradient(90deg, #b39ddb 0%, #f8bbd0 100%)',
            color: '#fff',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(90deg, #f8bbd0 0%, #b39ddb 100%)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ColorGeneratorForm; 