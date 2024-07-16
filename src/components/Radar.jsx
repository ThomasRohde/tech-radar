/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
  useTheme,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateTechnologiesWithPositions } from "../utils/radarCalculations";
import useTechnologies from "./useTechnologies";
import SharedAppBar from "./SharedAppBar";
import useRadarContext from './useRadarContext';
import { QUADRANTS, RINGS, STATUSES } from '../constants';
import RadarSVG from './RadarSVG';
import TechTooltip from './TechTooltip';

const TechnologyRadar = () => {
  const navigate = useNavigate();
  const { technologies, loading, error, getAllCustomRadars, getCustomRadar } =
    useTechnologies();
  const [hoveredTech, setHoveredTech] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const radarRef = useRef(null);
  const containerRef = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [svgSize, setSvgSize] = useState({ width: 800, height: 800 });
  const { selectedRadarId, radarName, updateSelectedRadar } = useRadarContext();

  const customRadars = getAllCustomRadars();

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

  const technologiesWithPositions = useMemo(
    () => calculateTechnologiesWithPositions(radarData, svgSize, RINGS),
    [radarData, svgSize]
  );

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
    const currentContainer = containerRef.current;

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }

    window.addEventListener("resize", updateSize);

    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const getColor = (quadrantIndex) => {
    const colors = [
      theme.palette.success.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ];
    return colors[quadrantIndex];
  };

  const getStatusFill = (status) => {
    switch (status) {
      case "New":
        return theme.palette.success.light;
      case "Moved in/out":
        return theme.palette.info.light;
      case "No change":
        return theme.palette.warning.light;
      default:
        return theme.palette.warning.light;
    }
  };

  const handleMouseMove = (event) => {
    if (radarRef.current) {
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  useEffect(() => {
    const radar = radarRef.current;
    if (radar) {
      radar.addEventListener("mousemove", handleMouseMove);
      return () => radar.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const handleRadarChange = (event) => {
    const newRadarId = event.target.value;
    const newRadarName = newRadarId === "default" ? "Default Radar" : 
      customRadars.find(radar => radar.id.toString() === newRadarId)?.name || "Unknown Radar";
    updateSelectedRadar(newRadarId, newRadarName);
  };

  const handleQuadrantClick = (quadrantIndex) => {
    navigate(`/quadrant/${quadrantIndex}`);
  };

  const getCurrentRadarName = () => {
    if (selectedRadarId === "default") {
      return "Default Radar";
    } else {
      const customRadar = customRadars.find(
        (radar) => radar.id === parseInt(selectedRadarId)
      );
      return customRadar ? customRadar.name : "Unknown Radar";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          padding: theme.spacing(2),
          textAlign: "center",
        }}
      >
        <Typography color="error" variant="h6">
          Error loading technologies: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor: theme.palette.background.default, overflow: "hidden" }}>
      <SharedAppBar title="Technology Radar" />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: isSmallScreen ? "column" : "row", height: "100%", width: "100%", overflow: "hidden" }}>
        <Box ref={containerRef} sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", height: "100%", width: "100%", overflow: "hidden" }}>
          <Box sx={{ p: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 1 }}>
            <FormControl sx={{ minWidth: 150 }}>
              <Select value={selectedRadarId} onChange={handleRadarChange} size="small" displayEmpty>
                <MenuItem value="default">Default Radar</MenuItem>
                {customRadars.map((radar) => (
                  <MenuItem key={radar.id} value={radar.id.toString()}>
                    {radar.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Paper elevation={1} sx={{ px: 1, py: 0.5, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, display: "flex", alignItems: "center", height: "40px" }}>
              <Typography variant="body2">{getCurrentRadarName()}</Typography>
            </Paper>
          </Box>
          <Box ref={radarRef}>
            <RadarSVG
              svgSize={svgSize}
              technologiesWithPositions={technologiesWithPositions}
              handleQuadrantClick={handleQuadrantClick}
              getColor={getColor}
              getStatusFill={getStatusFill}
              setHoveredTech={setHoveredTech}
              isExtraSmallScreen={isExtraSmallScreen}
            />
          </Box>
        </Box>
  
        <Box sx={{ width: isSmallScreen ? "100%" : "300px", mt: isSmallScreen ? theme.spacing(2) : theme.spacing(8), ml: isSmallScreen ? 0 : theme.spacing(2), mr: theme.spacing(2), flexShrink: 0, overflowY: "auto", maxHeight: isSmallScreen ? "30vh" : "calc(100% - 64px)", pt: theme.spacing(2), pb: theme.spacing(2) }}>
          <Paper sx={{ p: theme.spacing(2) }}>
            <Typography variant="h6" gutterBottom>
              Status Legend
            </Typography>
            <List dense>
              {STATUSES.map((status) => (
                <ListItem key={status}>
                  <ListItemIcon>
                    <Box component="svg" width={20} height={20} viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" fill={getStatusFill(status)} stroke={theme.palette.background.paper} strokeWidth="2" />
                    </Box>
                  </ListItemIcon>
                  <ListItemText primary={status} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
  
      <TechTooltip tech={hoveredTech} position={tooltipPosition} />
    </Box>
  );
};

export default TechnologyRadar;
