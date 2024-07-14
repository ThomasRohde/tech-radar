import { Delete as DeleteIcon, Edit as EditIcon, Restore as RestoreIcon } from '@mui/icons-material';
import {
    Box,
    Chip,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useTechnologies } from './DataManager';

const QUADRANTS = ["Tools", "Techniques", "Platforms", "Languages & Frameworks"];
const RINGS = ["Adopt", "Trial", "Assess", "Hold"];

const TechList = ({ onSelectTech }) => {
    const { getAllTechnologies, deleteTechnology, restoreTechnology } = useTechnologies();
    const [filter, setFilter] = useState('active');
    const [searchTerm, setSearchTerm] = useState('');
    const [ringFilter, setRingFilter] = useState('');
    const [quadrantFilter, setQuadrantFilter] = useState('');
    const theme = useTheme();

    const allTechnologies = getAllTechnologies();

    const filteredTechs = useMemo(() => {
        return allTechnologies.filter(tech => {
            const matchesDeletedFilter = filter === 'active' ? !tech.deleted : tech.deleted;
            const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRing = ringFilter === '' || tech.ring === ringFilter;
            const matchesQuadrant = quadrantFilter === '' || tech.quadrantId === parseInt(quadrantFilter);
            return matchesDeletedFilter && matchesSearch && matchesRing && matchesQuadrant;
        });
    }, [allTechnologies, filter, searchTerm, ringFilter, quadrantFilter]);

    const handleDelete = (tech) => {
        deleteTechnology(tech.id);
    };

    const handleRestore = (tech) => {
        restoreTechnology(tech.id);
    };

    const getQuadrantColor = (quadrantId) => {
        const colors = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.error.main, theme.palette.warning.main];
        return colors[quadrantId];
    };

    const formControlStyle = {
        minWidth: '120px',
        '& .MuiInputLabel-root': {
            backgroundColor: theme.palette.background.paper,
            padding: '0 4px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                top: 0,
                borderColor: theme.palette.grey[400], // Lighter border color by default
            },
            '&:hover fieldset': {
                borderColor: theme.palette.text.primary, // Darker on hover
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main, // Primary color on focus
                borderWidth: '1px', // Keep border width consistent
            },
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
        // Remove default focus shadow
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
                pt: 2, // Add padding to the top of the container
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
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="deleted">Deleted</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <List>
                    {filteredTechs.map((tech) => (
                        <React.Fragment key={tech.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" component="div">
                                            {tech.name}
                                            <Chip 
                                                label={QUADRANTS[tech.quadrantId]}
                                                size="small"
                                                sx={{ 
                                                    ml: 1,
                                                    backgroundColor: getQuadrantColor(tech.quadrantId),
                                                    color: theme.palette.getContrastText(getQuadrantColor(tech.quadrantId))
                                                }}
                                            />
                                        </Typography>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Ring: {tech.ring}
                                            </Typography>
                                            {` — ${tech.description}`}
                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={() => onSelectTech(tech)}>
                                        <EditIcon />
                                    </IconButton>
                                    {tech.deleted ? (
                                        <IconButton edge="end" aria-label="restore" onClick={() => handleRestore(tech)}>
                                            <RestoreIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(tech)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default TechList;