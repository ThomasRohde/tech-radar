import {
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { calculateTechnologiesWithPositions } from '../utils/radarCalculations';
import { useTechnologies } from './DataManager';

const QUADRANTS = [
    { id: 0, name: "Techniques" },
    { id: 1, name: "Tools" },
    { id: 2, name: "Platforms" },
    { id: 3, name: "Languages & Frameworks" }
];

const RINGS = ["Adopt", "Trial", "Assess", "Hold"];

const TechnologyRadar = () => {
    const { technologies, loading, error } = useTechnologies();
    const [hoveredTech, setHoveredTech] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const radarRef = useRef(null);
    const containerRef = useRef(null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [svgSize, setSvgSize] = useState({ width: 800, height: 800 });

    const updateSize = () => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            const size = Math.min(width, height) * 0.9; // Use 90% of the available space
            setSvgSize({ width: size, height: size });
        }
    };

    useEffect(() => {
        updateSize();

        const resizeObserver = new ResizeObserver(updateSize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        window.addEventListener('resize', updateSize);

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    const technologiesWithPositions = useMemo(() =>
        calculateTechnologiesWithPositions(technologies, svgSize, RINGS),
        [svgSize, technologies]);

    const getColor = (quadrantId) => {
        const colors = ["#86B782", "#1EBB9B", "#F38A3E", "#B32059"];
        return colors[quadrantId];
    };

    const getStatusFill = (status) => {
        switch (status) {
            case "New": return "#86B782";
            case "Moved in/out": return "#1EBB9B";
            case "No change": return "#F38A3E";
            default: return "#F38A3E";
        }
    };

    const handleMouseMove = (event) => {
        if (radarRef.current) {
            const rect = radarRef.current.getBoundingClientRect();
            setTooltipPosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            });
        }
    };

    useEffect(() => {
        const radar = radarRef.current;
        if (radar) {
            radar.addEventListener('mousemove', handleMouseMove);
            return () => radar.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    const handleQuadrantClick = (quadrantId) => {
        console.log(`Clicked on ${QUADRANTS[quadrantId].name}`);
    };

    const QuadrantLabel = ({ x, y, textAnchor, children, onClick, multiline }) => {
        const [firstLine, secondLine] = multiline ? children.split('&') : [children];
        return (
            <g
                onClick={onClick}
                style={{ cursor: 'pointer' }}
            >
                <text
                    x={x}
                    y={y}
                    fontSize="18"
                    fontWeight="bold"
                    fill="#333"
                    textAnchor={textAnchor}
                >
                    {firstLine}
                    {multiline && (
                        <tspan x={x} dy="1.2em">
                            & {secondLine}
                        </tspan>
                    )}
                    <tspan dx="5">▶️</tspan>
                </text>
            </g>
        );
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)' // Semi-transparent background
                }}
            >
                <CircularProgress size={60} /> {/* Increased size for better visibility */}
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    padding: 2,
                    textAlign: 'center'
                }}
            >
                <Typography color="error" variant="h6">
                    Error loading technologies: {error.message}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: "#F2F1F1",
            overflow: 'hidden'
        }}>
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                maxWidth: '1600px',
                margin: '0 auto',
                width: '100%',
                height: '100%'
            }}>
                <Box ref={containerRef} sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    maxWidth: isSmallScreen ? '100%' : 'calc(100% - 300px)',
                    height: '100%',
                    overflow: 'hidden'
                }}>
                    <Typography variant="h4" component="h2" sx={{ mb: 0 }}>
                        Technology Radar
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>Hover over a technology for more information</Typography>
                    <Box
                        ref={radarRef}
                        component="svg"
                        width={svgSize.width}
                        height={svgSize.height}
                        viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Background */}
                        <rect width={svgSize.width} height={svgSize.height} fill="#F2F1F1" />

                        {/* Radar circle */}
                        <circle cx={svgSize.width / 2} cy={svgSize.height / 2} r={Math.min(svgSize.width, svgSize.height) / 2} fill="white" />

                        {/* Rings */}
                        {RINGS.map((_, index) => (
                            <circle
                                key={index}
                                cx={svgSize.width / 2}
                                cy={svgSize.height / 2}
                                r={(4 - index) * (Math.min(svgSize.width, svgSize.height) / 8)}
                                fill="none"
                                stroke="#ddd"
                                strokeWidth="2"
                            />
                        ))}

                        {/* Quadrant lines */}
                        <line x1="0" y1={svgSize.height / 2} x2={svgSize.width} y2={svgSize.height / 2} stroke="#ddd" strokeWidth="2" />
                        <line x1={svgSize.width / 2} y1="0" x2={svgSize.width / 2} y2={svgSize.height} stroke="#ddd" strokeWidth="2" />
                        {/* Ring labels */}
                        {!isExtraSmallScreen && RINGS.map((ring, index) => (
                            <text
                                key={ring}
                                x={svgSize.width / 2 + 10}
                                y={(4 - index) * (Math.min(svgSize.width, svgSize.height) / 8) - 5}
                                fontSize={Math.min(svgSize.width, svgSize.height) / 50}
                                textAnchor="start"
                                fill="#333"
                            >
                                {ring}
                            </text>
                        ))}
                        {/* Quadrant labels */}
                        {!isExtraSmallScreen && QUADRANTS.map((quadrant) => (
                            <QuadrantLabel
                                key={quadrant.id}
                                x={quadrant.id % 2 === 0 ? "10" : svgSize.width - 10}
                                y={quadrant.id < 2 ? "30" : svgSize.height - (quadrant.id === 3 ? 45 : 20)}
                                textAnchor={quadrant.id % 2 === 0 ? "start" : "end"}
                                onClick={() => handleQuadrantClick(quadrant.id)}
                                multiline={quadrant.id === 3}
                            >
                                {quadrant.name}
                            </QuadrantLabel>
                        ))}
                        {technologiesWithPositions.map((tech) => {
                            const { x, y } = tech.position;
                            return (
                                <g key={tech.id} onMouseEnter={() => setHoveredTech(tech)} onMouseLeave={() => setHoveredTech(null)}>
                                    <circle cx={x} cy={y} r={Math.min(svgSize.width, svgSize.height) / 50} fill={getColor(tech.quadrantId)} stroke="white" strokeWidth="2" />
                                    <circle cx={x} cy={y} r={Math.min(svgSize.width, svgSize.height) / 70} fill={getStatusFill(tech.status)} />
                                    <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="white" fontSize={Math.min(svgSize.width, svgSize.height) / 80}>{tech.id}</text>
                                </g>
                            );
                        })}
                    </Box>
                </Box>

                <Box sx={{
                    width: isSmallScreen ? '100%' : '300px',
                    mt: isSmallScreen ? 2 : 0,
                    ml: isSmallScreen ? 0 : 2,
                    flexShrink: 0,
                    overflowY: 'auto',
                    maxHeight: isSmallScreen ? '30vh' : '100%'
                }}>
                    {/* Legend */}
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Status Legend</Typography>
                        <List dense>
                            {["New", "Moved in/out", "No change"].map((status) => (
                                <ListItem key={status}>
                                    <ListItemIcon>
                                        <Box component="svg" width={20} height={20} viewBox="0 0 20 20">
                                            <circle cx="10" cy="10" r="8" fill={getStatusFill(status)} stroke="white" strokeWidth="2" />
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText primary={status} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Box>

            {/* Tooltip */}
            {hoveredTech && (
                <Paper
                    sx={{
                        position: "fixed",
                        left: tooltipPosition.x,
                        top: tooltipPosition.y,
                        p: 2,
                        maxWidth: 300,
                        transform: 'translate(10px, 10px)',
                        zIndex: 1000,
                        pointerEvents: 'none'
                    }}
                >
                    <Typography variant="h6" gutterBottom>{hoveredTech.name}</Typography>
                    <Typography variant="body2"><strong>Quadrant:</strong> {QUADRANTS[hoveredTech.quadrantId].name.replace('_', ' & ')}</Typography>
                    <Typography variant="body2"><strong>Ring:</strong> {hoveredTech.ring}</Typography>
                    <Typography variant="body2"><strong>Status:</strong> {hoveredTech.status}</Typography>
                    <Typography variant="body2"><strong>Description:</strong> {hoveredTech.description}</Typography>
                    <Typography variant="body2"><strong>Sponsor:</strong> {hoveredTech.sponsor}</Typography>
                    <Typography variant="body2"><strong>Date Added:</strong> {hoveredTech.date}</Typography>
                </Paper>
            )}
        </Box>
    );
};

export default TechnologyRadar;