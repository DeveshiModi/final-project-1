import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CopyNotification = ({ open, onClose, copiedColor }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        icon={<CheckCircleIcon />}
        sx={{ 
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          color: 'primary.main',
          '& .MuiAlert-icon': {
            color: 'primary.main',
          },
        }}
      >
        Copied {copiedColor} to clipboard!
      </Alert>
    </Snackbar>
  );
};

export default CopyNotification; 