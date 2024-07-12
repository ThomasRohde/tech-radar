import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    AppBar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTechnologies } from './DataManager';

const QUADRANTS = ["Tools", "Techniques", "Platforms", "Languages & Frameworks"];

const QuadrantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { technologies } = useTechnologies();

  const quadrantId = parseInt(id, 10);
  const quadrantName = QUADRANTS[quadrantId];

  // Filter technologies for this quadrant
  const quadrantTechnologies = technologies.filter(tech => tech.quadrantId === quadrantId);

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: theme.palette.background.default,
    }}>
      <AppBar 
        position="static" 
        color="default" 
        elevation={1}
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 56, sm: 64 },
          pl: { xs: theme.spacing(7), sm: theme.spacing(8) }, // Increased left padding to account for burger menu
          pr: theme.spacing(2),
        }}>
          <IconButton 
            edge="start"
            color="inherit"
            aria-label="back to home"
            onClick={() => navigate('/')}
            sx={{ mr: theme.spacing(2) }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant={isMobile ? "h6" : "h5"} component="h1" sx={{ flexGrow: 1, fontWeight: theme.typography.fontWeightMedium }}>
            {quadrantName} Quadrant
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ 
        flexGrow: 1,
        padding: theme.spacing(3),
        overflow: 'auto',
        paddingTop: { xs: theme.spacing(2), sm: theme.spacing(3) }, // Adjust top padding for mobile
      }}>
        <Paper elevation={2} sx={{ p: theme.spacing(3), mb: theme.spacing(3) }}>
          <Typography variant="h6" gutterBottom>
            About {quadrantName}
          </Typography>
          <Typography variant="body1">
            This section provides an overview of the technologies in the {quadrantName.toLowerCase()} quadrant.
            These technologies are crucial for our organization's technical strategy and innovation.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: theme.spacing(3) }}>
          <Typography variant="h6" gutterBottom>
            Technologies in this Quadrant
          </Typography>
          <List>
            {quadrantTechnologies.map((tech, index) => (
              <React.Fragment key={tech.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={tech.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Ring: {tech.ring}
                        </Typography>
                        {` — ${tech.description}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < quadrantTechnologies.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default QuadrantPage;