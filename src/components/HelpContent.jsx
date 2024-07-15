/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Typography as T,
  Box,
  List,
  ListItem as LI,
  ListItemText as LIT,
  ListItemIcon as LII,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const DotIcon = () => <FiberManualRecordIcon fontSize="small" />;

const getImagePath = (imageName) => {
    return `/tech-radar/images/${imageName}`;
  };
  

const sections = [
  {
    title: "What is a Technology Radar?",
    content: (
      <>
        <T variant="body1" paragraph>
          A Technology Radar is a visual tool for assessing and communicating
          technology trends and choices within an organization. It was
          originally created by ThoughtWorks and has since been adopted by many
          companies to guide their technology strategies.
        </T>
        <T variant="body1" paragraph>
          The radar is divided into four quadrants, representing different
          technology categories, and four rings, indicating the level of
          adoption for each technology.
        </T>
        <Box sx={{ my: 2, textAlign: "center" }}>
          <img
            src={getImagePath('radar_overview.png')} 
            alt="Technology Radar Overview"
            style={{ maxWidth: "50%", height: "auto" }}
          />
        </Box>
      </>
    ),
  },
  {
    title: "How to Use This Application",
    content: (
      <>
        <T variant="h6" gutterBottom>
          Main Radar View
        </T>
        <T paragraph>
          The main view shows all technologies plotted on the radar. Each dot
          represents a technology, with its position indicating both its
          category (quadrant) and adoption level (ring).
        </T>
        <T variant="h6" gutterBottom>
          Interacting with the Radar
        </T>
        <List dense>
          {[
            "Hover over a dot to see details about the technology.",
            "Click on a quadrant label to view detailed information about technologies in that category.",
            "Use the dropdown menu to switch between different radar views (if available).",
          ].map((text, index) => (
            <LI key={index}>
              <LII>
                <DotIcon />
              </LII>
              <LIT primary={text} />
            </LI>
          ))}
        </List>
        <T variant="h6" gutterBottom>
          Quadrant View
        </T>
        <T paragraph>
          The quadrant view provides a detailed list of technologies within a
          specific category, along with a zoomed-in view of that quadrant on the
          radar. Click on any quadrant label to go to the quadrant view.
        </T>
        <T variant="h6" gutterBottom>
          Custom Radars
        </T>
        <T paragraph>
          In addition to the main radar, you can create your own custom radars
          with a subset of technologies.
        </T>
        <List dense>
          {[
            "Navigate to the Custom Radars page from the menu.",
            'Click "Create Radar" to add a new custom radar.',
            "Give your radar a name and description.",
            'Use the "Manage Technologies" button to add or remove technologies from your custom radar.',
          ].map((text, index) => (
            <LI key={index}>
              <LII>
                <DotIcon />
              </LII>
              <LIT primary={text} />
            </LI>
          ))}
        </List>
        <T variant="h6" gutterBottom>
          Admin Page
        </T>
        <T paragraph>
          The Admin page allows you to manage the technologies on the main
          radar.
        </T>
        <List dense>
          {[
            "Access the Admin page from the menu (login required).",
            "Use the search and filter options to find specific technologies.",
            "Click the edit icon to update a technology's details.",
            "Click the delete icon to remove a technology from the radar.",
            'Click "Add New Tech" to add a new technology to the radar.',
          ].map((text, index) => (
            <LI key={index}>
              <LII>
                <DotIcon />
              </LII>
              <LIT primary={text} />
            </LI>
          ))}
        </List>
      </>
    ),
  },
  {
    title: "Understanding the Radar",
    content: (
      <>
        <T variant="h6" gutterBottom>
          Quadrants
        </T>
        <T paragraph>The radar is divided into four quadrants:</T>
        <List dense>
          {[
            "Tools: These are technologies that are ready-made and can be used as is.",
            "Techniques: These are ways of doing things, such as development practices or architectural approaches.",
            "Platforms: These are technologies upon which other technologies or processes are built.",
            "Languages & Frameworks: These are programming languages and the associated frameworks used for development.",
          ].map((text, index) => (
            <LI key={index}>
              <LII>
                <DotIcon />
              </LII>
              <LIT primary={text} />
            </LI>
          ))}
        </List>
        <T variant="h6" gutterBottom>
          Rings
        </T>
        <T paragraph>Each technology is placed in one of four rings:</T>
        <List dense>
          {[
            "Adopt: Technologies we have high confidence in to serve our purpose, also in large scale.",
            "Trial: Technologies that we think are worth pursuing. It's important to understand how to build up this capability.",
            "Assess: Technologies that are worth exploring with the goal of understanding how it will affect your enterprise.",
            "Hold: Proceed with caution.",
          ].map((text, index) => (
            <LI key={index}>
              <LII>
                <DotIcon />
              </LII>
              <LIT primary={text} />
            </LI>
          ))}
        </List>
        <T variant="h6" gutterBottom>
          Blips
        </T>
        <T paragraph>
          Each technology on the radar is represented by a blip. The color of
          the blip indicates its movement:
        </T>
        <List dense>
          {[
            "New: Newly added to this radar",
            "Moved: Moved in/out compared to the last radar",
            "No Change: No change in position from the last radar",
          ].map((text, index) => (
            <LI key={index}>
              <LII>
                <DotIcon />
              </LII>
              <LIT primary={text} />
            </LI>
          ))}
        </List>
      </>
    ),
  },
];

const HelpContent = ({ activeTab }) => {
  return sections[activeTab]?.content || <T>Content not found</T>;
};

export default HelpContent;
