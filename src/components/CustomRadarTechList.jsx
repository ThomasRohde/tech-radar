/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useTechnologies } from './DataManager';

const QUADRANTS = ["Tools", "Techniques", "Platforms", "Languages & Frameworks"];
const RINGS = ["Adopt", "Trial", "Assess", "Hold"];

const CustomRadarTechList = ({ radarId, onClose }) => {
  const { getAllTechnologies, getCustomRadar, addTechnologyToCustomRadar, removeTechnologyFromCustomRadar } = useTechnologies();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [ringFilter, setRingFilter] = useState('');
  const [quadrantFilter, setQuadrantFilter] = useState('');
  const theme = useTheme();

  const allTechnologies = getAllTechnologies();
  const customRadar = getCustomRadar(radarId);

  const filteredTechs = useMemo(() => {
    return allTechnologies.filter(tech => {
      const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRing = ringFilter === '' || tech.ring === ringFilter;
      const matchesQuadrant = quadrantFilter === '' || tech.quadrantId === parseInt(quadrantFilter);
      const matchesFilter = filter === 'all' || 
        (filter === 'included' && customRadar.technologies.includes(tech.id)) ||
        (filter === 'excluded' && !customRadar.technologies.includes(tech.id));
      return matchesSearch && matchesRing && matchesQuadrant && matchesFilter;
    });
  }, [allTechnologies, searchTerm, ringFilter, quadrantFilter, filter, customRadar]);

  const handleToggle = (techId) => {
    if (customRadar.technologies.includes(techId)) {
      removeTechnologyFromCustomRadar(radarId, techId);
    } else {
      addTechnologyToCustomRadar(radarId, techId);
    }
  };

  const formControlStyle = {
    minWidth: '120px',
    '& .MuiInputLabel-root': {
      backgroundColor: theme.palette.background.paper,
      padding: '0 4px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.grey[400],
      },
      '&:hover fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '1px',
      },
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      boxShadow: 'none',
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ 
        mb: 2, 
        display: 'flex', 
        gap: 2, 
        flexWrap: 'wrap',
        pt: 2,
      }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ ...formControlStyle, flexGrow: 1, minWidth: '200px' }}
        />
        <FormControl variant="outlined" size="small" sx={formControlStyle}>
          <InputLabel>Ring</InputLabel>
          <Select
            value={ringFilter}
            onChange={(e) => setRingFilter(e.target.value)}
            label="Ring"
          >
            <MenuItem value="">All</MenuItem>
            {RINGS.map((ring) => (
              <MenuItem key={ring} value={ring}>{ring}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" sx={formControlStyle}>
          <InputLabel>Quadrant</InputLabel>
          <Select
            value={quadrantFilter}
            onChange={(e) => setQuadrantFilter(e.target.value)}
            label="Quadrant"
          >
            <MenuItem value="">All</MenuItem>
            {QUADRANTS.map((quadrant, index) => (
              <MenuItem key={index} value={index}>{quadrant}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" sx={formControlStyle}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="included">Included</MenuItem>
            <MenuItem value="excluded">Excluded</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List>
          {filteredTechs.map((tech) => (
            <React.Fragment key={tech.id}>
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={customRadar.technologies.includes(tech.id)}
                    onChange={() => handleToggle(tech.id)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {tech.name}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="text.primary">
                        Ring: {tech.ring} | Quadrant: {QUADRANTS[tech.quadrantId]}
                      </Typography>
                      {` — ${tech.description}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CustomRadarTechList;