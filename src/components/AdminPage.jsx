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
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>Admin Page</Typography>
        <Typography variant="body1">
          Welcome to the admin page. Here you can manage your technology radar data.
        </Typography>
      </Box>
      
      <TechList onSelectTech={handleSelectTech} onCreateTech={handleCreateTech} />

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <TechDetails tech={selectedTech} onClose={handleCloseDialog} />
      </Dialog>
    </Container>
  );
};

export default AdminPage;