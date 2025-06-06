import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import PaletteTools from "./PaletteTools";

const ColorsCard = ({ waiting, colors, prompt, onSavePalette }) => {
  const [copied, setCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [paletteName, setPaletteName] = useState("");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(text);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCloseSnackbar = () => {
    setCopied(false);
  };

  const handleSavePalette = () => {
    const newPalette = {
      id: Date.now().toString(),
      name: paletteName,
      colors: colors,
      prompt: prompt,
      createdAt: new Date().toISOString(),
    };
    onSavePalette(newPalette);
    setSaveDialogOpen(false);
    setPaletteName("");
  };

  // If no colors and not waiting, show nothing
  if (!colors || colors.length === 0) {
    return null;
  }

  if (waiting) {
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
            Generating your palette...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Our AI is creating beautiful colors for you
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <>
      <Card 
        sx={{ 
          width: "100%", 
          height: { xs: "auto", md: "60vh" },
          minHeight: { xs: "400px", md: "60vh" },
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid #b39ddb',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            height: "100%",
            flexDirection: { xs: "column", md: "row" },
            minHeight: { xs: "400px", md: "100%" },
          }}
        >
          {colors.map((color, i) => {
            const cleanedColor = color.replaceAll('"', "");
            return (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: { xs: "80px", md: "100%" },
                  minHeight: { xs: "80px", md: "auto" },
                  position: "relative",
                  backgroundColor: cleanedColor,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      textShadow: "0 0 4px rgba(0,0,0,0.5)",
                      fontWeight: 600,
                    }}
                  >
                    {cleanedColor}
                  </Typography>
                  <Tooltip title="Copy color">
                    <IconButton
                      onClick={() => copyToClipboard(cleanedColor)}
                      sx={{
                        color: "#fff",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(4px)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                        },
                      }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box 
          sx={{ 
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1,
          }}
        >
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => setSaveDialogOpen(true)}
            sx={{
              background: 'linear-gradient(90deg, #b39ddb 0%, #f8bbd0 100%)',
              color: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                background: 'linear-gradient(90deg, #f8bbd0 0%, #b39ddb 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Save Palette
          </Button>
        </Box>
      </Card>

      <PaletteTools colors={colors} />

      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Save Palette</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Palette Name"
            fullWidth
            variant="outlined"
            value={paletteName}
            onChange={(e) => setPaletteName(e.target.value)}
            placeholder="Enter a name for your palette"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSavePalette}
            variant="contained"
            disabled={!paletteName.trim()}
            sx={{
              background: 'linear-gradient(90deg, #b39ddb 0%, #f8bbd0 100%)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(90deg, #f8bbd0 0%, #b39ddb 100%)',
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
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
    </>
  );
};

export default ColorsCard; 