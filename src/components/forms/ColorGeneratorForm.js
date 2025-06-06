import React, { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const styles = [
  { value: 'modern', label: 'Modern' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'neon', label: 'Neon' },
  { value: 'pastel', label: 'Pastel' },
  { value: 'monochrome', label: 'Monochrome' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'complementary', label: 'Complementary' },
  { value: 'analogous', label: 'Analogous' },
  { value: 'triadic', label: 'Triadic' },
  { value: 'tetradic', label: 'Tetradic' },
];

const ColorGeneratorForm = ({ onSubmit, loading }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('modern');

  const handleChange = useCallback((e) => {
    setPrompt(e.target.value);
  }, []);

  const handleStyleChange = useCallback((e) => {
    setStyle(e.target.value);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt, style);
    }
  }, [prompt, style, onSubmit]);

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
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <TextField
            fullWidth
            label="Describe your palette"
            variant="outlined"
            value={prompt}
            onChange={handleChange}
            placeholder="For example, A calming forest theme with sage greens"
            disabled={loading}
            sx={{
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
          <FormControl fullWidth>
            <InputLabel id="style-select-label">Style</InputLabel>
            <Select
              labelId="style-select-label"
              id="style-select"
              value={style}
              label="Style"
              onChange={handleStyleChange}
              disabled={loading}
              sx={{
                backgroundColor: 'white',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              {styles.map((styleOption) => (
                <MenuItem key={styleOption.value} value={styleOption.value}>
                  {styleOption.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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