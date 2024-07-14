/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';

const CustomRadarDetails = ({ radar, onClose, onSave }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (radar) {
      setFormData({
        name: radar.name,
        description: radar.description
      });
    }
  }, [radar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
        {radar ? 'Edit Custom Radar' : 'Create Custom Radar'}
      </DialogTitle>
      <DialogContent sx={{ 
        bgcolor: theme.palette.background.paper, 
        color: theme.palette.text.primary,
        '& .MuiTextField-root': { my: 1 }
      }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ pt: 2 }}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor: theme.palette.background.paper, p: 2 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {radar ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomRadarDetails;