import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTechnologies } from './DataManager';

const QUADRANTS = ["Tools", "Techniques", "Platforms", "Languages & Frameworks"];
const RINGS = ["Adopt", "Trial", "Assess", "Hold"];
const STATUSES = ["New", "Moved in/out", "No change"];

const TechDetails = ({ tech, onClose }) => {
  const { addTechnology, updateTechnology } = useTechnologies();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    ring: '',
    quadrantId: '',
    status: '',
    description: '',
    sponsor: '',
    date: ''
  });

  useEffect(() => {
    if (tech) {
      setFormData(tech);
    }
  }, [tech]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tech) {
      updateTechnology(formData);
    } else {
      addTechnology(formData);
    }
    onClose();
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
        {tech ? 'Edit Technology' : 'Add New Technology'}
      </DialogTitle>
      <DialogContent sx={{ 
        bgcolor: theme.palette.background.paper, 
        color: theme.palette.text.primary,
        '& .MuiTextField-root, & .MuiFormControl-root': { my: 1 }
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
          <FormControl fullWidth variant="outlined">
            <InputLabel>Ring</InputLabel>
            <Select
              name="ring"
              value={formData.ring}
              onChange={handleChange}
              label="Ring"
              required
            >
              {RINGS.map(ring => (
                <MenuItem key={ring} value={ring}>{ring}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Quadrant</InputLabel>
            <Select
              name="quadrantId"
              value={formData.quadrantId}
              onChange={handleChange}
              label="Quadrant"
              required
            >
              {QUADRANTS.map((quadrant, index) => (
                <MenuItem key={index} value={index}>{quadrant}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
              required
            >
              {STATUSES.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <TextField
            fullWidth
            name="sponsor"
            label="Sponsor"
            value={formData.sponsor}
            onChange={handleChange}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
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
          {tech ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TechDetails;