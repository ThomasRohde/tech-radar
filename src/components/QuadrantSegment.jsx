import { Box, Paper, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

const QuadrantSegment = ({ quadrantId, technologies, svgSize }) => {
  const theme = useTheme();
  const [hoveredTech, setHoveredTech] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const RINGS = ['Adopt', 'Trial', 'Assess', 'Hold'];

  const getQuadrantPath = (quadrantId) => {
    const radius = svgSize / 2;
    switch (quadrantId) {
      case 3: // Tools (upper right)
        return `M 0 0 L ${radius} 0 A ${radius} ${radius} 0 0 1 0 ${radius} Z`;
      case 2: // Techniques (upper left)
        return `M 0 0 L 0 ${radius} A ${radius} ${radius} 0 0 1 -${radius} 0 Z`;
      case 1: // Platforms (lower left)
        return `M 0 0 L -${radius} 0 A ${radius} ${radius} 0 0 1 0 -${radius} Z`;
      case 0: // Languages & Frameworks (lower right)
        return `M 0 0 L 0 -${radius} A ${radius} ${radius} 0 0 1 ${radius} 0 Z`;
      default:
        return '';
    }
  };

  const getColor = (quadrantId) => {
    const colors = [theme.palette.success.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main];
    return colors[quadrantId];
  };

  const getStatusFill = (status) => {
    switch (status) {
      case "New": return theme.palette.success.light;
      case "Moved in/out": return theme.palette.info.light;
      case "No change": return theme.palette.warning.light;
      default: return theme.palette.warning.light;
    }
  };

  const handleMouseEnter = (tech, event) => {
    setHoveredTech(tech);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredTech(null);
  };

  return (
    <Box sx={{ position: 'relative', width: svgSize, height: svgSize }}>
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        width={svgSize}
        height={svgSize}
      >
        <g transform={`translate(${svgSize / 2}, ${svgSize / 2})`}>
          <path
            d={getQuadrantPath(quadrantId)}
            fill={theme.palette.background.paper}
            stroke={theme.palette.divider}
          />
          {RINGS.map((ring, index) => (
            <path
              key={ring}
              d={getQuadrantPath(quadrantId)}
              fill="none"
              stroke={theme.palette.divider}
              strokeWidth="1"
              transform={`scale(${(index + 1) / 4})`}
            />
          ))}
          {technologies.map((tech) => {
            const { x, y } = tech.position;
            // Adjust coordinates to be relative to the quadrant's center
            const adjustedX = x - svgSize / 2;
            const adjustedY = y - svgSize / 2;
            return (
              <g
                key={tech.id}
                transform={`translate(${adjustedX}, ${adjustedY})`}
                onMouseEnter={(e) => handleMouseEnter(tech, e)}
                onMouseLeave={handleMouseLeave}
              >
                <circle
                  r={svgSize / 50}
                  fill={getColor(quadrantId)}
                  stroke={theme.palette.background.paper}
                  strokeWidth="1"
                />
                <circle
                  r={svgSize / 70}
                  fill={getStatusFill(tech.status)}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={theme.palette.background.paper}
                  fontSize={theme.typography.caption.fontSize}
                >
                  {tech.id}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      {hoveredTech && (
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            p: theme.spacing(2),
            maxWidth: 300,
            transform: 'translate(10px, 10px)',
            zIndex: theme.zIndex.tooltip,
            pointerEvents: 'none',
            backgroundColor: theme.palette.background.paper
          }}
        >
          <Typography variant="h6" gutterBottom>{hoveredTech.name}</Typography>
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

export default QuadrantSegment;