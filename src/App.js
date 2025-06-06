/**
 * Main App component for the Color Palette Generator.
 * Sets up the theme, layout, error boundaries, and connects the color generation logic.
 */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, Box, CssBaseline } from '@mui/material';
import Layout from './components/layout/Layout';
import ColorGeneratorForm from './components/forms/ColorGeneratorForm';
import ColorsCard from './components/colors/ColorsCard';
import SavedPalettes from './components/colors/SavedPalettes';
import useColorGeneration from './components/hooks/useColorGeneration';
import ErrorBoundary from './components/common/ErrorBoundary';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b39ddb',
      light: '#e0c3fc',
      dark: '#836fa9',
    },
    secondary: {
      main: '#f8bbd0',
      light: '#fce4ec',
      dark: '#c48b9f',
    },
    background: {
      default: 'rgba(255,255,255,0.8)',
      paper: '#ffffff',
    },
    text: {
      primary: '#3a3a3a',
      secondary: '#6d6d6d',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
        },
      },
    },
  },
});

const App = () => {
  const { colors, loading, error, generateColors, lastPrompt } = useColorGeneration();
  const [savedPalettes, setSavedPalettes] = useState([]);

  // Load saved palettes from localStorage on initial render
  useEffect(() => {
    const savedPalettesData = localStorage.getItem('savedPalettes');
    if (savedPalettesData) {
      setSavedPalettes(JSON.parse(savedPalettesData));
    }
  }, []);

  // Save palettes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  const handleSavePalette = (newPalette) => {
    setSavedPalettes(prevPalettes => [newPalette, ...prevPalettes]);
  };

  const handleDeletePalette = (paletteId) => {
    setSavedPalettes(prevPalettes => 
      prevPalettes.filter(palette => palette.id !== paletteId)
    );
  };

  const handleCopyColor = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    // Top-level error boundary for the entire app
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
          }}
        >
          <Router>
            <Layout>
              {/* Error boundary for the form section */}
              <ErrorBoundary>
                <ErrorBoundary>
                  <ColorGeneratorForm onSubmit={generateColors} error={error} />
                </ErrorBoundary>
              </ErrorBoundary>
              {/* Error boundary for the color card display */}
              <ErrorBoundary>
                <ErrorBoundary>
                  <ColorsCard
                    waiting={loading}
                    colors={colors}
                    prompt={lastPrompt}
                    onSavePalette={handleSavePalette}
                  />
                </ErrorBoundary>
              </ErrorBoundary>
              <ErrorBoundary>
                <SavedPalettes
                  palettes={savedPalettes}
                  onDelete={handleDeletePalette}
                  onCopy={handleCopyColor}
                />
              </ErrorBoundary>
            </Layout>
          </Router>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
