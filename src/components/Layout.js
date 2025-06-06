import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} sx={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        borderRadius: '0 0 18px 18px',
        px: 3,
        py: 1.5,
        mt: 2,
        mx: 'auto',
        width: { xs: '98%', sm: '95%', md: '80%' },
      }}>
        <Toolbar disableGutters sx={{ minHeight: 64, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              letterSpacing: '0.04em',
              background: 'linear-gradient(90deg, #b39ddb 0%, #f8bbd0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Deveshi Modi
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              letterSpacing: '0.04em',
              background: 'linear-gradient(90deg, #b39ddb 0%, #f8bbd0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >
            HCDE 438
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025, HCDE 438: Web Technologies, Color Palette Generator !!!
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 