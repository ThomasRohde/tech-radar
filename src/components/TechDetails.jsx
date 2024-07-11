import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTechnologies } from './DataManager';

const QUADRANTS = ["Tools", "Techniques", "Platforms", "Languages & Frameworks"];
const RINGS = ["Adopt", "Trial", "Assess", "Hold"];
const STATUSES = ["New", "Moved in/out", "No change"];

const TechDetails = ({ tech, onClose }) => {
  const { addTechnology, updateTechnology } = useTechnologies();
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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {tech ? 'Edit Technology' : 'Add New Technology'}
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Ring</InputLabel>
        <Select
          name="ring"
          value={formData.ring}
          onChange={handleChange}
          required
        >
          {RINGS.map(ring => (
            <MenuItem key={ring} value={ring}>{ring}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Quadrant</InputLabel>
        <Select
          name="quadrantId"
          value={formData.quadrantId}
          onChange={handleChange}
          required
        >
          {QUADRANTS.map((quadrant, index) => (
            <MenuItem key={index} value={index}>{quadrant}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
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
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" type="submit">
          {tech ? 'Update' : 'Add'}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TechDetails;