/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTechnologies } from './DataManager';
import SharedAppBar from './SharedAppBar';
import CustomRadarList from './CustomRadarList';
import CustomRadarDetails from './CustomRadarDetails';
import CustomRadarTechList from './CustomRadarTechList';

const CustomRadarPage = () => {
  const [selectedRadar, setSelectedRadar] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTechListOpen, setIsTechListOpen] = useState(false);
  const { addCustomRadar, updateCustomRadar } = useTechnologies();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCreateRadar = () => {
    setSelectedRadar(null);
    setIsDialogOpen(true);
  };

  const handleEditRadar = (radar) => {
    setSelectedRadar(radar);
    setIsDialogOpen(true);
  };

  const handleManageTechnologies = (radar) => {
    setSelectedRadar(radar);
    setIsTechListOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRadar(null);
  };

  const handleCloseTechList = () => {
    setIsTechListOpen(false);
    setSelectedRadar(null);
  };

  const handleSaveRadar = (formData) => {
    if (selectedRadar) {
      updateCustomRadar({ ...selectedRadar, ...formData });
    } else {
      addCustomRadar(formData);
    }
    handleCloseDialog();
  };

  const actionButton = (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={handleCreateRadar}
      size={isSmallScreen ? "small" : "medium"}
    >
      Create Radar
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
      <SharedAppBar title="Custom Radars" actionButton={actionButton} />

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
        <CustomRadarList
          onSelectRadar={handleEditRadar}
          onManageTechnologies={handleManageTechnologies}
        />
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullScreen={isSmallScreen}
        fullWidth
        maxWidth="sm"
      >
        <CustomRadarDetails
          radar={selectedRadar}
          onClose={handleCloseDialog}
          onSave={handleSaveRadar}
        />
      </Dialog>

      <Dialog
        open={isTechListOpen}
        onClose={handleCloseTechList}
        fullScreen={true}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseTechList}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Manage Technologies for {selectedRadar?.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {selectedRadar && (
            <CustomRadarTechList
              radarId={selectedRadar.id}
              onClose={handleCloseTechList}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CustomRadarPage;