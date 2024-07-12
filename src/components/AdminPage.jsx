import { Box, Container, Dialog, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import TechDetails from './TechDetails';
import TechList from './TechList';

const AdminPage = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelectTech = (tech) => {
    setSelectedTech(tech);
    setIsDialogOpen(true);
  };

  const handleCreateTech = () => {
    setSelectedTech(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTech(null);
  };

  return (
    <Box sx={{
      height: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      pt: isSmallScreen ? 8 : 4, // Increased top padding for small screens
    }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant={isSmallScreen ? 'h5' : 'h4'}
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Admin Page
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Welcome to the admin page. Here you can manage your technology radar data.
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <TechList onSelectTech={handleSelectTech} onCreateTech={handleCreateTech} />
        </Box>
      </Container>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <TechDetails tech={selectedTech} onClose={handleCloseDialog} />
      </Dialog>
    </Box>
  );
};

export default AdminPage;