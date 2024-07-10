import InfoIcon from "@mui/icons-material/Info";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";


const QUADRANTS = ["Techniques", "Tools", "Platforms", "Languages & Frameworks"];
const RINGS = ["Adopt", "Trial", "Assess", "Hold"];

const TECHNOLOGIES = {
    techniques: [
        { id: 1, name: "Micro Frontends", ring: "Adopt", status: "No change", description: "Architectural style where independently deliverable frontend applications are composed into a greater whole", sponsor: "Frontend Team", date: "2023-05-15" },
        { id: 2, name: "Serverless Architecture", ring: "Trial", status: "Moved in/out", description: "A way to build and run applications and services without having to manage infrastructure", sponsor: "Cloud Team", date: "2023-06-22" },
        { id: 3, name: "Event Sourcing", ring: "Assess", status: "New", description: "Storing all changes to the application state as a sequence of events", sponsor: "Backend Team", date: "2023-07-30" },
        { id: 4, name: "Blockchain", ring: "Hold", status: "No change", description: "A distributed ledger technology that allows for secure, transparent and tamper-proof transactions", sponsor: "Innovation Department", date: "2023-04-10" }
    ],
    tools: [
        { id: 5, name: "Docker", ring: "Adopt", status: "No change", description: "A platform for developing, shipping, and running applications in containers", sponsor: "DevOps Team", date: "2023-03-05" },
        { id: 6, name: "Kubernetes", ring: "Trial", status: "Moved in/out", description: "An open-source system for automating deployment, scaling, and management of containerized applications", sponsor: "Infrastructure Team", date: "2023-08-17" },
        { id: 7, name: "Terraform", ring: "Assess", status: "New", description: "An open-source infrastructure as code software tool that enables you to safely and predictably create, change, and improve infrastructure", sponsor: "Cloud Team", date: "2023-09-01" },
        { id: 8, name: "Jenkins X", ring: "Hold", status: "No change", description: "An open source automated CI/CD solution for cloud native applications on Kubernetes", sponsor: "DevOps Team", date: "2023-02-28" }
    ],
    platforms: [
        { id: 9, name: "AWS", ring: "Adopt", status: "No change", description: "A comprehensive and widely adopted cloud platform, offering over 200 fully featured services", sponsor: "Infrastructure Team", date: "2023-01-15" },
        { id: 10, name: "Google Cloud Platform", ring: "Trial", status: "Moved in/out", description: "A suite of cloud computing services that runs on the same infrastructure that Google uses internally", sponsor: "Cloud Team", date: "2023-07-20" },
        { id: 11, name: "Azure", ring: "Assess", status: "New", description: "Microsoft's public cloud computing platform, providing a range of cloud services", sponsor: "IT Department", date: "2023-08-05" },
        { id: 12, name: "Heroku", ring: "Hold", status: "No change", description: "A cloud platform as a service supporting several programming languages", sponsor: "Development Team", date: "2023-04-30" }
    ],
    languages_and_frameworks: [
        { id: 13, name: "TypeScript", ring: "Adopt", status: "No change", description: "A typed superset of JavaScript that compiles to plain JavaScript", sponsor: "Frontend Team", date: "2023-02-10" },
        { id: 14, name: "React", ring: "Trial", status: "Moved in/out", description: "A JavaScript library for building user interfaces", sponsor: "UI Team", date: "2023-06-15" },
        { id: 15, name: "GraphQL", ring: "Assess", status: "New", description: "A query language for APIs and a runtime for executing those queries with your existing data", sponsor: "API Team", date: "2023-09-10" },
        { id: 16, name: "Angular", ring: "Hold", status: "No change", description: "A platform for building mobile and desktop web applications", sponsor: "Frontend Team", date: "2023-03-20" }
    ]
};

const TechnologyRadar = () => {
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
            const size = Math.min(width, height);
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

    const getQuadrantAngles = (quadrant) => {
        switch (quadrant) {
            case "Techniques": return { start: -Math.PI / 4, end: Math.PI / 4 };
            case "Tools": return { start: Math.PI / 4, end: 3 * Math.PI / 4 };
            case "Platforms": return { start: 3 * Math.PI / 4, end: 5 * Math.PI / 4 };
            case "Languages & Frameworks": return { start: 5 * Math.PI / 4, end: 7 * Math.PI / 4 };
            default: return { start: 0, end: 2 * Math.PI };
        }
    };

    const getRingRadius = (ring) => {
        const index = RINGS.indexOf(ring);
        return (index + 1) * 100; // Full radius for each ring
    };

    const calculatePosition = (tech, quadrant) => {
        const { start, end } = getQuadrantAngles(quadrant);
        const angle = start + Math.random() * (end - start);
        const maxRadius = Math.min(svgSize.width, svgSize.height) / 2;
        const radius = (getRingRadius(tech.ring) / 400) * maxRadius - Math.random() * (maxRadius / 4);
        const x = svgSize.width / 2 + radius * Math.cos(angle);
        const y = svgSize.height / 2 + radius * Math.sin(angle);
        return { x, y };
    };

    // Recalculate positions when SVG size changes
    const technologiesWithPositions = React.useMemo(() =>
        Object.entries(TECHNOLOGIES).flatMap(([quadrantKey, techs]) => {
            const quadrant = quadrantKey.replace("_", " & ");
            return techs.map(tech => ({
                ...tech,
                quadrant,
                position: calculatePosition(tech, quadrant)
            }));
        }),
        [svgSize]
    );

    const getColor = (quadrant) => {
        const colors = ["#86B782", "#1EBB9B", "#F38A3E", "#B32059"];
        return colors[QUADRANTS.indexOf(quadrant)];
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

    const handleQuadrantClick = (quadrant) => {
        console.log(`Clicked on ${quadrant}`);
    };

    const QuadrantLabel = ({ x, y, textAnchor, children, onClick }) => (
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
                {children} ▶️
            </text>
        </g>
    );

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: "#F2F1F1",
            overflow: 'hidden'
        }}>
            <Typography variant="h4" component="h2" align="center" sx={{ py: 2 }}>
                Technology Radar
            </Typography>
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                maxWidth: '1600px',
                margin: '0 auto',
                width: '100%'
            }}>
                <Box ref={containerRef} sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    maxWidth: isSmallScreen ? '100%' : 'calc(100% - 300px)',
                    height: '100%'
                }}>
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
                                strokeWidth="1"
                            />
                        ))}

                        {/* Quadrant lines */}
                        <line x1="0" y1={svgSize.height / 2} x2={svgSize.width} y2={svgSize.height / 2} stroke="#ddd" strokeWidth="1" />
                        <line x1={svgSize.width / 2} y1="0" x2={svgSize.width / 2} y2={svgSize.height} stroke="#ddd" strokeWidth="1" />

                        {/* Technologies */}
                        {technologiesWithPositions.map((tech) => {
                            const { x, y } = tech.position;
                            return (
                                <g key={tech.id} onMouseEnter={() => setHoveredTech(tech)} onMouseLeave={() => setHoveredTech(null)}>
                                    <circle cx={x} cy={y} r={Math.min(svgSize.width, svgSize.height) / 50} fill={getColor(tech.quadrant)} stroke="white" strokeWidth="2" />
                                    <circle cx={x} cy={y} r={Math.min(svgSize.width, svgSize.height) / 70} fill={getStatusFill(tech.status)} />
                                    <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="white" fontSize={Math.min(svgSize.width, svgSize.height) / 80}>{tech.id}</text>
                                </g>
                            );
                        })}

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
                        {!isExtraSmallScreen && (
                            <>
                                <QuadrantLabel x="10" y="30" textAnchor="start" onClick={() => handleQuadrantClick("Techniques")}>
                                    Techniques
                                </QuadrantLabel>
                                <QuadrantLabel x={svgSize.width - 10} y="30" textAnchor="end" onClick={() => handleQuadrantClick("Tools")}>
                                    Tools
                                </QuadrantLabel>
                                <QuadrantLabel x="10" y={svgSize.height - 20} textAnchor="start" onClick={() => handleQuadrantClick("Platforms")}>
                                    Platforms
                                </QuadrantLabel>
                                <QuadrantLabel x={svgSize.width - 10} y={svgSize.height - 20} textAnchor="end" onClick={() => handleQuadrantClick("Languages & Frameworks")}>
                                    Languages & Frameworks
                                </QuadrantLabel>
                            </>
                        )}
                    </Box>
                </Box>

                <Box sx={{
                    width: isSmallScreen ? '100%' : '300px',
                    mt: isSmallScreen ? 2 : 0,
                    ml: isSmallScreen ? 0 : 2,
                    flexShrink: 0
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
                    <Typography variant="body2"><strong>Quadrant:</strong> {hoveredTech.quadrant}</Typography>
                    <Typography variant="body2"><strong>Ring:</strong> {hoveredTech.ring}</Typography>
                    <Typography variant="body2"><strong>Status:</strong> {hoveredTech.status}</Typography>
                    <Typography variant="body2"><strong>Description:</strong> {hoveredTech.description}</Typography>
                    <Typography variant="body2"><strong>Sponsor:</strong> {hoveredTech.sponsor}</Typography>
                    <Typography variant="body2"><strong>Date Added:</strong> {hoveredTech.date}</Typography>
                </Paper>
            )}

            {/* Info Icon */}
            <Box sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <InfoIcon sx={{ mr: 1 }} />
                <Typography variant="body2">Hover over a technology for more information</Typography>
            </Box>
        </Box>
    );
};

export default TechnologyRadar;