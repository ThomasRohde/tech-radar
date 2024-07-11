import { Box, Container, Dialog, Typography } from '@mui/material';
import React, { useState } from 'react';
import TechDetails from './TechDetails';
import TechList from './TechList';

const AdminPage = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" gutterBottom>Admin Page</Typography>
          <Typography variant="body1">
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