import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    AppBar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTechnologies } from './DataManager';
import QuadrantSegment from './QuadrantSegment';

const QUADRANTS = ["Tools", "Techniques", "Platforms", "Languages & Frameworks"];
const RINGS = ["Adopt", "Trial", "Assess", "Hold"];

const QuadrantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { technologies } = useTechnologies();
  const [svgSize, setSvgSize] = useState(800);

  const quadrantId = parseInt(id, 10);
  const quadrantName = QUADRANTS[quadrantId];

  const quadrantTechnologies = technologies.filter(tech => tech.quadrantId === quadrantId);

  const technologiesByRing = RINGS.map(ring => ({
    ring,
    technologies: quadrantTechnologies.filter(tech => tech.ring === ring)
  }));

  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(
        window.innerWidth * (isMobile ? 0.9 : 0.45),
        window.innerHeight * 0.9
      );
      setSvgSize(size);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, [isMobile]);

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
          pl: { xs: theme.spacing(7), sm: theme.spacing(8) },
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
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflow: 'hidden',
      }}>
        <Box sx={{ 
          width: { xs: '100%', md: '50%' },
          p: 3,
          overflowY: 'auto',
        }}>
          {technologiesByRing.map(({ ring, technologies }) => (
            <Box key={ring} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {ring}
                <IconButton size="small">
                  <ExpandMoreIcon />
                </IconButton>
              </Typography>
              <List>
                {technologies.map((tech, index) => (
                  <React.Fragment key={tech.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${tech.id}. ${tech.name}`}
                        secondary={tech.description}
                      />
                    </ListItem>
                    {index < technologies.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          ))}
        </Box>

        <Box sx={{ 
          width: { xs: '100%', md: '50%' },
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <QuadrantSegment 
            quadrantId={quadrantId} 
            technologies={quadrantTechnologies} 
            svgSize={svgSize}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default QuadrantPage;