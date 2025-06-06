import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CodeIcon from '@mui/icons-material/Code';
import GradientIcon from '@mui/icons-material/Gradient';
import PaletteIcon from '@mui/icons-material/Palette';

const PaletteTools = ({ colors }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setCopied(true);
  };

  const handleCloseSnackbar = () => {
    setCopied(false);
  };

  const generateCSS = () => {
    return colors.map((color, index) => `--color-${index + 1}: ${color};`).join('\n');
  };

  const generateSCSS = () => {
    return colors.map((color, index) => `$color-${index + 1}: ${color};`).join('\n');
  };

  const generateTailwind = () => {
    return colors.map((color, index) => `'color-${index + 1}': '${color}',`).join('\n');
  };

  const checkAccessibility = () => {
    const getLuminance = (hex) => {
      const rgb = parseInt(hex.slice(1), 16);
      const r = ((rgb >> 16) & 0xff) / 255;
      const g = ((rgb >> 8) & 0xff) / 255;
      const b = (rgb & 0xff) / 255;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const results = colors.map((color, index) => {
      const luminance = getLuminance(color);
      const isAccessible = luminance > 0.5;
      return {
        color,
        index: index + 1,
        luminance,
        isAccessible,
        suggestion: isAccessible ? 'Good contrast' : 'Consider using a lighter shade',
      };
    });

    return results;
  };

  const generateGradients = () => {
    const gradients = [];
    for (let i = 0; i < colors.length - 1; i++) {
      gradients.push({
        from: colors[i],
        to: colors[i + 1],
        angle: '90deg',
      });
    }
    // Add a gradient from last to first color
    gradients.push({
      from: colors[colors.length - 1],
      to: colors[0],
      angle: '90deg',
    });
    return gradients;
  };

  const generateColorVariations = (color) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = ((rgb >> 16) & 0xff);
    const g = ((rgb >> 8) & 0xff);
    const b = (rgb & 0xff);

    const variations = {
      lighter: `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`,
      darker: `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`,
      saturated: `rgb(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.max(0, b - 20)})`,
      desaturated: `rgb(${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.min(255, b + 20)})`,
    };

    return variations;
  };

  const accessibilityResults = checkAccessibility();
  const gradients = generateGradients();

  return (
    <>
      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={<AccessibilityIcon />}
          onClick={() => { setOpen(true); setActiveTab(0); }}
          sx={{ flex: { xs: '1 1 100%', sm: '0 1 auto' } }}
        >
          Accessibility
        </Button>
        <Button
          variant="outlined"
          startIcon={<CodeIcon />}
          onClick={() => { setOpen(true); setActiveTab(1); }}
          sx={{ flex: { xs: '1 1 100%', sm: '0 1 auto' } }}
        >
          Export
        </Button>
        <Button
          variant="outlined"
          startIcon={<GradientIcon />}
          onClick={() => { setOpen(true); setActiveTab(2); }}
          sx={{ flex: { xs: '1 1 100%', sm: '0 1 auto' } }}
        >
          Gradients
        </Button>
        <Button
          variant="outlined"
          startIcon={<PaletteIcon />}
          onClick={() => { setOpen(true); setActiveTab(3); }}
          sx={{ flex: { xs: '1 1 100%', sm: '0 1 auto' } }}
        >
          Variations
        </Button>
      </Box>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Palette Tools</DialogTitle>
        <DialogContent>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab label="Accessibility" />
            <Tab label="Export" />
            <Tab label="Gradients" />
            <Tab label="Variations" />
          </Tabs>

          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>Color Accessibility Check</Typography>
              {accessibilityResults.map((result) => (
                <Paper 
                  key={result.index}
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 2,
                    backgroundColor: result.color,
                    color: result.isAccessible ? '#000' : '#fff',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">
                      Color {result.index}: {result.color}
                    </Typography>
                    <Typography variant="body2">
                      Luminance: {result.luminance.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      {result.suggestion}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Export Formats</Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>CSS Variables</Typography>
                <Paper sx={{ p: 2, position: 'relative' }}>
                  <pre style={{ margin: 0 }}>{generateCSS()}</pre>
                  <Tooltip title="Copy CSS">
                    <IconButton 
                      onClick={() => handleCopy(generateCSS())}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </Paper>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>SCSS Variables</Typography>
                <Paper sx={{ p: 2, position: 'relative' }}>
                  <pre style={{ margin: 0 }}>{generateSCSS()}</pre>
                  <Tooltip title="Copy SCSS">
                    <IconButton 
                      onClick={() => handleCopy(generateSCSS())}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </Paper>
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom>Tailwind Config</Typography>
                <Paper sx={{ p: 2, position: 'relative' }}>
                  <pre style={{ margin: 0 }}>{generateTailwind()}</pre>
                  <Tooltip title="Copy Tailwind">
                    <IconButton 
                      onClick={() => handleCopy(generateTailwind())}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </Paper>
              </Box>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Generated Gradients</Typography>
              <Grid container spacing={2}>
                {gradients.map((gradient, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper 
                      sx={{ 
                        p: 2,
                        height: '100px',
                        background: `linear-gradient(${gradient.angle}, ${gradient.from}, ${gradient.to})`,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#fff', textShadow: '0 0 4px rgba(0,0,0,0.5)' }}>
                        {gradient.from} → {gradient.to}
                      </Typography>
                      <Tooltip title="Copy gradient">
                        <IconButton
                          onClick={() => handleCopy(`linear-gradient(${gradient.angle}, ${gradient.from}, ${gradient.to})`)}
                          sx={{ color: '#fff' }}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>Color Variations</Typography>
              <Grid container spacing={2}>
                {colors.map((color, index) => {
                  const variations = generateColorVariations(color);
                  return (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>Base: {color}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <Box sx={{ flex: 1, height: 40, backgroundColor: variations.lighter, borderRadius: 1 }} />
                          <Box sx={{ flex: 1, height: 40, backgroundColor: color, borderRadius: 1 }} />
                          <Box sx={{ flex: 1, height: 40, backgroundColor: variations.darker, borderRadius: 1 }} />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Box sx={{ flex: 1, height: 40, backgroundColor: variations.saturated, borderRadius: 1 }} />
                          <Box sx={{ flex: 1, height: 40, backgroundColor: variations.desaturated, borderRadius: 1 }} />
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PaletteTools; 