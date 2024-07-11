import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { useTechnologies } from './DataManager';

const QUADRANTS = ["Tools", "Techniques", "Platforms", "Languages & Frameworks"];

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
    const { technologies, deleteTechnology } = useTechnologies();
    const [filter, setFilter] = useState('active');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const filteredTechs = technologies.filter(tech =>
        filter === 'active' ? !tech.deleted : tech.deleted
    );

    const handleDelete = (tech) => {
        deleteTechnology(tech.id);
    };

    return (
        <Paper elevation={1} sx={{ width: '100%' }}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Technologies</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    gap: 1,
                    mb: 2
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
                <Divider />
            </Box>
            <List>
                {filteredTechs.map((tech) => (
                    <ListItem
                        key={tech.id}
                        secondaryAction={
                            <Box>
                                <IconButton size="small" edge="end" aria-label="edit" onClick={() => onSelectTech(tech)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" edge="end" aria-label="delete" onClick={() => handleDelete(tech)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
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
                                    Ring: {tech.ring}
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