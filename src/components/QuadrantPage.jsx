import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QUADRANTS = ["Tools", "Techniques", "Platforms", "Languages & Frameworks"];

const QuadrantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const quadrantId = parseInt(id, 10);

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ 
          minHeight: { xs: 56, sm: 64 },
          pl: { xs: 7, sm: 8 },
          pr: 2,
        }}>
          <IconButton 
            color="inherit"
            aria-label="back to home"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant={isMobile ? "h6" : "h5"} component="h1" sx={{ flexGrow: 1 }}>
            {QUADRANTS[quadrantId]} Quadrant
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ 
        flexGrow: 1,
        padding: { xs: 2, sm: 3, md: 4 },
        overflow: 'auto'
      }}>
        <Typography variant="body1">
          Content for the {QUADRANTS[quadrantId]} quadrant goes here.
        </Typography>
      </Box>
    </Box>
  );
};

export default QuadrantPage;