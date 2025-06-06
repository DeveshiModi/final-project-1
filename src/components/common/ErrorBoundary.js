/**
 * ErrorBoundary component for catching and displaying errors in the React component tree.
 * Shows a user-friendly error message and a refresh button.
 */
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // State to track if an error has occurred
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Update state when an error is thrown
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error details and update state
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render a user-friendly error message and refresh button
      return (
        <Box
          sx={{
            p: 4,
            m: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #ffcdd2',
            textAlign: 'center',
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
          <Typography variant="h5" color="error" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{
              background: 'linear-gradient(90deg, #b39ddb 0%, #f8bbd0 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #f8bbd0 0%, #b39ddb 100%)',
              },
            }}
          >
            Refresh Page
          </Button>
        </Box>
      );
    }

    // Render children if no error
    return this.props.children;
  }
}

export default ErrorBoundary; 