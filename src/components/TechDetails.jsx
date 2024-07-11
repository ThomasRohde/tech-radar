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
      <DialogTitle>{tech ? 'Edit Technology' : 'Add New Technology'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ pt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="ring-label">Ring</InputLabel>
            <Select
              labelId="ring-label"
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
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="quadrant-label">Quadrant</InputLabel>
            <Select
              labelId="quadrant-label"
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
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
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
            margin="normal"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="sponsor"
            label="Sponsor"
            value={formData.sponsor}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {tech ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TechDetails;