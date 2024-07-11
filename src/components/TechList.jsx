import { Delete as DeleteIcon, Edit as EditIcon, Restore as RestoreIcon, Search as SearchIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useTechnologies } from './DataManager';

const QUADRANTS = ["Tools", "Techniques", "Platforms", "Languages & Frameworks"];
const RINGS = ["Adopt", "Trial", "Assess", "Hold"];

const QuadrantPieSlice = ({ quadrantId }) => {
    const theme = useTheme();
    const colors = [theme.palette.success.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main];

    let startAngle, endAngle;
    switch (quadrantId) {
        case 0: // Tools
            startAngle = 0;
            endAngle = 90;
            break;
        case 1: // Techniques
            startAngle = 270;
            endAngle = 360;
            break;
        case 2: // Platforms
            startAngle = 180;
            endAngle = 270;
            break;
        case 3: // Languages & Frameworks
            startAngle = 90;
            endAngle = 180;
            break;
        default:
            startAngle = 0;
            endAngle = 360;
    }

    const startRadians = (startAngle * Math.PI) / 180;
    const endRadians = (endAngle * Math.PI) / 180;

    const x1 = Math.cos(startRadians);
    const y1 = Math.sin(startRadians);
    const x2 = Math.cos(endRadians);
    const y2 = Math.sin(endRadians);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const pathData = [
        `M 0 0`,
        `L ${x1} ${y1}`,
        `A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`
    ].join(" ");

    return (
        <Tooltip title={QUADRANTS[quadrantId]}>
            <svg width="16" height="16" viewBox="-1.1 -1.1 2.2 2.2" style={{ transform: 'rotate(-90deg)', marginRight: '4px' }}>
                <circle cx="0" cy="0" r="1" fill="none" stroke={colors[quadrantId]} strokeWidth="0.2" />
                <path d={pathData} fill={colors[quadrantId]} />
            </svg>
        </Tooltip>
    );
};

const TechList = ({ onSelectTech, onCreateTech }) => {
    const { getAllTechnologies, deleteTechnology, restoreTechnology } = useTechnologies();
    const [filter, setFilter] = useState('active');
    const [searchTerm, setSearchTerm] = useState('');
    const [ringFilter, setRingFilter] = useState('');
    const [quadrantFilter, setQuadrantFilter] = useState('');
    const [sponsorFilter, setSponsorFilter] = useState('');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const allTechnologies = getAllTechnologies();

    const sponsors = useMemo(() => {
        const uniqueSponsors = new Set(allTechnologies.map(tech => tech.sponsor));
        return Array.from(uniqueSponsors).sort();
    }, [allTechnologies]);

    const filteredTechs = useMemo(() => {
        return allTechnologies.filter(tech => {
            const matchesDeletedFilter = filter === 'active' ? !tech.deleted : tech.deleted;
            const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tech.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRing = ringFilter === '' || tech.ring === ringFilter;
            const matchesQuadrant = quadrantFilter === '' || tech.quadrantId === parseInt(quadrantFilter);
            const matchesSponsor = sponsorFilter === '' || tech.sponsor === sponsorFilter;
            return matchesDeletedFilter && matchesSearch && matchesRing && matchesQuadrant && matchesSponsor;
        });
    }, [allTechnologies, filter, searchTerm, ringFilter, quadrantFilter, sponsorFilter]);

    const handleDelete = (tech) => {
        deleteTechnology(tech.id);
    };

    const handleRestore = (tech) => {
        restoreTechnology(tech.id);
    };

    return (
        <Paper elevation={1} sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Technologies</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mb: 2
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        gap: 1,
                    }}>
                        <Button
                            variant={filter === 'active' ? 'contained' : 'outlined'}
                            onClick={() => setFilter('active')}
                            size="small"
                            fullWidth={isSmallScreen}
                        >
                            ACTIVE
                        </Button>
                        <Button
                            variant={filter === 'deleted' ? 'contained' : 'outlined'}
                            onClick={() => setFilter('deleted')}
                            size="small"
                            fullWidth={isSmallScreen}
                        >
                            DELETED
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onCreateTech}
                            size="small"
                            fullWidth={isSmallScreen}
                        >
                            ADD NEW TECH
                        </Button>
                    </Box>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search technologies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        gap: 1,
                    }}>
                        <FormControl fullWidth size="small">
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
                        <FormControl fullWidth size="small">
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
                        <FormControl fullWidth size="small">
                            <InputLabel>Sponsor</InputLabel>
                            <Select
                                value={sponsorFilter}
                                onChange={(e) => setSponsorFilter(e.target.value)}
                                label="Sponsor"
                            >
                                <MenuItem value="">All</MenuItem>
                                {sponsors.map((sponsor) => (
                                    <MenuItem key={sponsor} value={sponsor}>{sponsor}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Divider />
            </Box>
            <List sx={{ flexGrow: 1, overflow: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                {filteredTechs.map((tech) => (
                    <ListItem
                        key={tech.id}
                        secondaryAction={
                            <Box>
                                <IconButton size="small" edge="end" aria-label="edit" onClick={() => onSelectTech(tech)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                {tech.deleted ? (
                                    <IconButton size="small" edge="end" aria-label="restore" onClick={() => handleRestore(tech)}>
                                        <RestoreIcon fontSize="small" />
                                    </IconButton>
                                ) : (
                                    <IconButton size="small" edge="end" aria-label="delete" onClick={() => handleDelete(tech)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Box>
                        }
                    >
                        <ListItemText
                            primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <QuadrantPieSlice quadrantId={tech.quadrantId} />
                                    <Typography variant="body1">
                                        {tech.name}
                                    </Typography>
                                </Box>
                            }
                            secondary={
                                <Typography variant="body2" color="text.secondary">
                                    Ring: {tech.ring} | Quadrant: {QUADRANTS[tech.quadrantId]} | Sponsor: {tech.sponsor}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default TechList;