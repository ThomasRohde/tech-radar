/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import { QUADRANTS } from '../constants';

const TechTooltip = ({ tech, position }) => {
  const theme = useTheme();

  if (!tech) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        left: position.x,
        top: position.y,
        p: theme.spacing(2),
        maxWidth: 300,
        transform: "translate(10px, 10px)",
        zIndex: theme.zIndex.tooltip,
        pointerEvents: "none",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {tech.name}
      </Typography>
      <Typography variant="body2">
        <strong>Quadrant:</strong> {QUADRANTS[tech.quadrantId]}
      </Typography>
      <Typography variant="body2">
        <strong>Ring:</strong> {tech.ring}
      </Typography>
      <Typography variant="body2">
        <strong>Status:</strong> {tech.status}
      </Typography>
      <Typography variant="body2">
        <strong>Description:</strong> {tech.description}
      </Typography>
      <Typography variant="body2">
        <strong>Sponsor:</strong> {tech.sponsor}
      </Typography>
      <Typography variant="body2">
        <strong>Date Added:</strong> {tech.date}
      </Typography>
    </Paper>
  );
};

export default TechTooltip;