import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TechDetails from './TechDetails';
import TechList from './TechList';

const AdminPage = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

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
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      bgcolor: theme.palette.background.default,
      color: theme.palette.text.primary,
    }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{
          pl: { xs: theme.spacing(7), sm: theme.spacing(8) },
          pr: theme.spacing(2),
        }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back to home"
            onClick={() => navigate('/')}
            sx={{ mr: theme.spacing(2) }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant={isSmallScreen ? "h6" : "h5"} component="h1" sx={{ flexGrow: 1, fontWeight: theme.typography.fontWeightMedium }}>
            Admin Page
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateTech}
            size={isSmallScreen ? "small" : "medium"}
          >
            Add New Tech
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mt: 4, mb: 4, overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ p: theme.spacing(3), display: 'flex', flexDirection: 'column', height: '100%' }}>
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