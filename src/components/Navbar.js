import React from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ borderBottom: '1px solid rgba(226, 232, 240, 0.9)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 2 }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: '0.01em' }}>
              Campus Notifications
            </Typography>
            <Typography variant="body2" color="secondary" sx={{ opacity: 0.9, mt: 0.5 }}>
              Professional notifications dashboard
            </Typography>
          </Box>
          <Button component={RouterLink} to="/" color="inherit" variant="outlined" sx={{ borderColor: 'rgba(226, 232, 240, 0.9)' }}>
            Home
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
