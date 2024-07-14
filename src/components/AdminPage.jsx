/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SharedAppBar from './SharedAppBar';
import TechList from './TechList';
import TechDetails from './TechDetails';

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

  const actionButton = (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={handleCreateTech}
      size={isSmallScreen ? "small" : "medium"}
    >
      Add New Tech
    </Button>
  );

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      bgcolor: theme.palette.background.default,
      color: theme.palette.text.primary,
    }}>
      <SharedAppBar title="Admin Page" actionButton={actionButton} />

      <Container 
        maxWidth="lg" 
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mt: 4, mb: 4, overflow: 'hidden' }}
      >
        <Paper 
          elevation={3} 
          sx={{ p: theme.spacing(3), display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Typography variant="h6" gutterBottom>
            Manage Technologies
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Here you can view, add, edit, or delete technologies in the radar.
          </Typography>
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <TechList onSelectTech={handleSelectTech} />
          </Box>
        </Paper>
      </Container>

      <Dialog 
        open={isDialogOpen} 
        onClose={handleCloseDialog}
        fullScreen={isSmallScreen}
        fullWidth
        maxWidth="sm"
      >
        <TechDetails tech={selectedTech} onClose={handleCloseDialog} />
      </Dialog>
    </Box>
  );
};

export default AdminPage;