import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTechnologies } from './DataManager';

const CustomRadarList = ({ onSelectRadar, onManageTechnologies }) => {
  const { getAllCustomRadars } = useTechnologies();
  const customRadars = getAllCustomRadars();

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Your Custom Radars
      </Typography>
      {customRadars.length === 0 ? (
        <Typography variant="body1">
          You haven't created any custom radars yet. Click the "Create Radar" button to get started!
        </Typography>
      ) : (
        <List>
          {customRadars.map((radar) => (
            <ListItem key={radar.id}>
              <ListItemText
                primary={radar.name}
                secondary={radar.description}
              />
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onManageTechnologies(radar)}
                  sx={{ mr: 1 }}
                >
                  Manage Technologies
                </Button>
                <IconButton edge="end" aria-label="edit" onClick={() => onSelectRadar(radar)}>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default CustomRadarList;