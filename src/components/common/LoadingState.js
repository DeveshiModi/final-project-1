import React from 'react';
import { Card, Box, Typography } from '@mui/material';

const LoadingState = ({ message = "Loading...", subMessage }) => {
  return (
    <Card 
      sx={{ 
        width: "100%", 
        height: "60vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid #b39ddb',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#b39ddb' }}>
          {message}
        </Typography>
        {subMessage && (
          <Typography variant="body2" color="text.secondary">
            {subMessage}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default LoadingState; 