import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTechnologies } from "./DataManager";
import QuadrantSegment from "./QuadrantSegment";
import { calculateTechnologiesWithPositions } from '../utils/radarCalculations';

const QUADRANTS = [
  "Tools",
  "Techniques",
  "Platforms",
  "Languages & Frameworks",
];
const RINGS = ["Adopt", "Trial", "Assess", "Hold"];

const RING_DESCRIPTIONS = {
  "Adopt": "Technologies we strongly recommend. They're proven, mature, and ready for use in our projects.",
  "Trial": "Technologies worth pursuing. They've shown promise and we suggest trying them on projects that can handle the risk.",
  "Assess": "Technologies worth exploring with the goal of understanding how they'll affect our organization.",
  "Hold": "Technologies that are not recommended for new projects or continued investment, though they may be maintained for existing projects.",
};

const QuadrantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { technologies } = useTechnologies();
  const [svgSize, setSvgSize] = useState(800);
  const [expandedTech, setExpandedTech] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  const quadrantId = parseInt(id, 10);
  const quadrantName = QUADRANTS[quadrantId];

  const quadrantTechnologies = useMemo(() => 
    technologies.filter((tech) => tech.quadrantId === quadrantId),
    [technologies, quadrantId]
  );

  const technologiesByRing = useMemo(() => 
    RINGS.map((ring) => ({
      ring,
      technologies: quadrantTechnologies.filter((tech) => tech.ring === ring),
    })),
    [quadrantTechnologies]
  );

  const calculatePositions = useCallback(() => {
    return calculateTechnologiesWithPositions(quadrantTechnologies, { width: svgSize, height: svgSize }, RINGS);
  }, [quadrantTechnologies, svgSize]);

  const technologiesWithPositions = useMemo(calculatePositions, [calculatePositions]);

  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(
        window.innerWidth * (isMobile ? 0.9 : 0.6),
        window.innerHeight * 0.9
      );
      setSvgSize(size);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, [isMobile]);

  const handleExpandTech = (techId) => {
    setExpandedTech(expandedTech === techId ? null : techId);
  };

  const handleMouseEnter = (tech) => {
    setHoveredTech(tech);
  };

  const handleMouseLeave = () => {
    setHoveredTech(null);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.default,
      }}
    >
      <AppBar
        position="static"
        color="default"
        elevation={1}
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 56, sm: 64 },
            pl: { xs: theme.spacing(7), sm: theme.spacing(8) },
            pr: theme.spacing(2),
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back to home"
            onClick={() => navigate("/")}
            sx={{ mr: theme.spacing(2) }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h1"
            sx={{ flexGrow: 1, fontWeight: theme.typography.fontWeightMedium }}
          >
            {quadrantName} Quadrant
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "30%" },
            p: 3,
            overflowY: "auto",
          }}
        >
          {technologiesByRing.map(({ ring, technologies }) => (
            <Box key={ring} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                {ring}
                <Tooltip title={RING_DESCRIPTIONS[ring]} arrow>
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <List>
                {technologies.map((tech) => (
                  <ListItem
                    key={tech.id}
                    disablePadding
                    sx={{
                      bgcolor: expandedTech === tech.id ? theme.palette.action.hover : 'transparent',
                      mb: 1,
                      borderRadius: 1,
                    }}
                    onMouseEnter={() => handleMouseEnter(tech)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ListItemButton onClick={() => handleExpandTech(tech.id)}>
                      <ListItemText
                        primary={`${tech.id}. ${tech.name}`}
                        secondary={
                          expandedTech === tech.id ? tech.description : null
                        }
                      />
                      <IconButton edge="end" aria-label="expand">
                        <ExpandMoreIcon
                          sx={{
                            transform: expandedTech === tech.id
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                            transition: theme.transitions.create('transform', {
                              duration: theme.transitions.duration.shortest,
                            }),
                          }}
                        />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QuadrantSegment
            quadrantId={quadrantId}
            technologies={technologiesWithPositions}
            svgSize={svgSize}
            hoveredTech={hoveredTech}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default QuadrantPage;