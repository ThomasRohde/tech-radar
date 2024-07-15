import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography as T,
  Box,
  useMediaQuery,
  Tabs,
  Tab,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HelpIcon from '@mui/icons-material/Help';
import HelpContent from './HelpContent';

const Help = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen} aria-label="help">
        <HelpIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="help-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="help-dialog-title">
          <T variant="h6">Help & Information</T>
        </DialogTitle>
        <DialogContent>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="help topics"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            <Tab label="What is a Tech Radar?" />
            <Tab label="How to Use" />
            <Tab label="Understanding the Radar" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            <HelpContent activeTab={activeTab} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Help;