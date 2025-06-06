import React from 'react';
import { Box, Typography, Card, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const SavedPalettes = ({ palettes, onDelete, onCopy }) => {
  if (!palettes || palettes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No saved palettes yet
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Saved Palettes
      </Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
        {palettes.map((palette, index) => (
          <Card key={index} sx={{ p: 2, background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)' }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {palette.name || `Palette ${index + 1}`}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {palette.prompt}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {palette.colors.map((color, colorIndex) => (
                <Box
                  key={colorIndex}
                  sx={{
                    flex: 1,
                    height: '40px',
                    backgroundColor: color,
                    borderRadius: 1,
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                  onClick={() => onCopy(color)}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Tooltip title="Delete palette">
                <IconButton
                  size="small"
                  onClick={() => onDelete(palette.id)}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SavedPalettes; 