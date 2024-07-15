import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

const HelpContent = ({ activeTab }) => {
  const theme = useTheme();

  const sections = [
    {
      title: 'What is a Technology Radar?',
      content: (
        <>
          <Typography paragraph>
            A Technology Radar is a visual tool for assessing and communicating technology trends and choices within an organization. It was originally created by ThoughtWorks and has since been adopted by many companies to guide their technology strategies.
          </Typography>
          <Typography paragraph>
            The radar is divided into four quadrants, representing different technology categories, and four rings, indicating the level of adoption for each technology.
          </Typography>
          <Box sx={{ my: 2, textAlign: 'center' }}>
            <img src="/images/radar_overview.png" alt="Technology Radar Overview" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
        </>
      ),
    },
    {
      title: 'How to Use This Application',
      content: (
        <>
          <Typography variant="h6" gutterBottom>Main Radar View</Typography>
          <Typography paragraph>
            The main view shows all technologies plotted on the radar. Each dot represents a technology, with its position indicating both its category (quadrant) and adoption level (ring).
          </Typography>
          <Box sx={{ my: 2, textAlign: 'center' }}>
            <img src="/images/main_view.png" alt="Main Radar View" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
          <Typography variant="h6" gutterBottom>Interacting with the Radar</Typography>
          <Typography paragraph>
            - Hover over a dot to see details about the technology.
            - Click on a quadrant label to view detailed information about technologies in that category.
            - Use the dropdown menu to switch between different radar views (if available).
          </Typography>
          <Typography variant="h6" gutterBottom>Quadrant View</Typography>
          <Typography paragraph>
            The quadrant view provides a detailed list of technologies within a specific category, along with a zoomed-in view of that quadrant on the radar.
          </Typography>
          <Box sx={{ my: 2, textAlign: 'center' }}>
            <img src="/images/quadrant_view.png" alt="Quadrant View" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
        </>
      ),
    },
    {
      title: 'Understanding the Radar',
      content: (
        <>
          <Typography variant="h6" gutterBottom>Quadrants</Typography>
          <Typography paragraph>
            The radar is divided into four quadrants:
            - Tools: These are technologies that are ready-made and can be used as is.
            - Techniques: These are ways of doing things, such as development practices or architectural approaches.
            - Platforms: These are technologies upon which other technologies or processes are built.
            - Languages & Frameworks: These are programming languages and the associated frameworks used for development.
          </Typography>
          <Typography variant="h6" gutterBottom>Rings</Typography>
          <Typography paragraph>
            Each technology is placed in one of four rings:
            - Adopt: Technologies we have high confidence in to serve our purpose, also in large scale.
            - Trial: Technologies that we think are worth pursuing. It's important to understand how to build up this capability.
            - Assess: Technologies that are worth exploring with the goal of understanding how it will affect your enterprise.
            - Hold: Proceed with caution.
          </Typography>
          <Typography variant="h6" gutterBottom>Blips</Typography>
          <Typography paragraph>
            Each technology on the radar is represented by a blip. The color of the blip indicates its movement:
            - New: Newly added to this radar
            - Moved: Moved in/out compared to the last radar
            - No Change: No change in position from the last radar
          </Typography>
          <Box sx={{ my: 2, textAlign: 'center' }}>
            <img src="/images/blip_legend.png" alt="Blip Legend" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
        </>
      ),
    },
  ];

  return sections[activeTab].content;
};

const Help = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen} aria-label="help">
        <HelpIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="help-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="help-dialog-title">Help & Information</DialogTitle>
        <DialogContent>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="help topics">
            <Tab label="What is a Tech Radar?" />
            <Tab label="How to Use" />
            <Tab label="Understanding the Radar" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            <HelpContent activeTab={activeTab} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Help;