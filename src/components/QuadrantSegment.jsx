import { Box, Paper, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

const QuadrantSegment = ({ quadrantId, technologies, svgSize }) => {
  const theme = useTheme();
  const [hoveredTech, setHoveredTech] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

  const calculatePosition = (tech, index) => {
    const angle = (index / technologies.length) * Math.PI / 2;
    const ringIndex = ['Adopt', 'Trial', 'Assess', 'Hold'].indexOf(tech.ring);
    const radius = ((ringIndex + 1) / 4) * (svgSize / 2);
    let x, y;

    switch (quadrantId) {
      case 3: // Tools (upper right)
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius;
        break;
      case 2: // Techniques (upper left)
        x = -Math.sin(angle) * radius;
        y = Math.cos(angle) * radius;
        break;
      case 1: // Platforms (lower left)
        x = -Math.cos(angle) * radius;
        y = -Math.sin(angle) * radius;
        break;
      case 0: // Languages & Frameworks (lower right)
        x = Math.sin(angle) * radius;
        y = -Math.cos(angle) * radius;
        break;
      default:
        x = 0;
        y = 0;
    }

    return { x, y };
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
        viewBox={`-${svgSize / 2} -${svgSize / 2} ${svgSize} ${svgSize}`}
        width={svgSize}
        height={svgSize}
      >
        <path
          d={getQuadrantPath(quadrantId)}
          fill={theme.palette.background.paper}
          stroke={theme.palette.divider}
        />
        {['Adopt', 'Trial', 'Assess', 'Hold'].map((ring, index) => (
          <path
            key={ring}
            d={getQuadrantPath(quadrantId)}
            fill="none"
            stroke={theme.palette.divider}
            strokeWidth="1"
            transform={`scale(${(index + 1) / 4})`}
          />
        ))}
        {technologies.map((tech, index) => {
          const { x, y } = calculatePosition(tech, index);
          return (
            <g
              key={tech.id}
              onMouseEnter={(e) => handleMouseEnter(tech, e)}
              onMouseLeave={handleMouseLeave}
            >
              <circle
                cx={x}
                cy={y}
                r={svgSize / 50}
                fill={getColor(quadrantId)}
                stroke={theme.palette.background.paper}
                strokeWidth="1"
              />
              <circle
                cx={x}
                cy={y}
                r={svgSize / 70}
                fill={getStatusFill(tech.status)}
              />
              <text
                x={x}
                y={y}
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