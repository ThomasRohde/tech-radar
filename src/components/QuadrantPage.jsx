import React, { useState, useCallback, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import useTechnologies from './useTechnologies';
import QuadrantSegment from "./QuadrantSegment";
import { calculateTechnologiesWithPositions } from '../utils/radarCalculations';
import SharedAppBar from './SharedAppBar';
import useRadarContext from './useRadarContext';

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
  const { technologies, getCustomRadar } = useTechnologies();
  const { selectedRadarId, radarName } = useRadarContext();
  const [svgSize, setSvgSize] = useState(800);
  const [expandedTech, setExpandedTech] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  const quadrantId = parseInt(id, 10);
  const quadrantName = QUADRANTS[quadrantId];

  const radarData = useMemo(() => {
    if (selectedRadarId === "default") {
      return technologies;
    } else {
      const customRadar = getCustomRadar(parseInt(selectedRadarId));
      if (customRadar) {
        return technologies.filter((tech) => customRadar.technologies.includes(tech.id));
      }
      return [];
    }
  }, [selectedRadarId, technologies, getCustomRadar]);

  const quadrantTechnologies = useMemo(() => 
    radarData.filter((tech) => tech.quadrantId === quadrantId),
    [radarData, quadrantId]
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

  React.useEffect(() => {
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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      bgcolor: theme.palette.background.default,
    }}>
      <SharedAppBar 
        title={`${quadrantName} Quadrant - ${radarName}`}
        showBackButton={true}
      />

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