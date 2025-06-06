import React from 'react';
import { Box, Typography, IconButton, Tooltip, Fade } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ColorSwatch = ({ color, onCopy }) => {
  const cleanedColor = color.replaceAll('"', "");

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: { xs: "100px", md: "auto" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          "& .color-info": {
            opacity: 1,
          },
        },
      }}
      onClick={() => onCopy(cleanedColor)}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: cleanedColor,
        }}
      />
      <Fade in={true} timeout={1000}>
        <Box
          className="color-info"
          sx={{
            position: "relative",
            zIndex: 1,
            opacity: 0,
            transition: "opacity 0.3s ease",
            textAlign: "center",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              textShadow: "0 0 4px rgba(0,0,0,0.5)",
              mb: 1,
            }}
          >
            {cleanedColor}
          </Typography>
          <Tooltip title="Copy color">
            <IconButton
              sx={{
                color: "#fff",
                backgroundColor: "rgba(132, 169, 140, 0.2)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  backgroundColor: "rgba(132, 169, 140, 0.3)",
                },
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Fade>
    </Box>
  );
};

export default ColorSwatch; 