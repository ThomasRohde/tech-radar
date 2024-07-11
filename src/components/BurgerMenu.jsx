import {
  AdminPanelSettings as AdminIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';

const BurgerMenu = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, onClick: () => handleNavigation('home') },
    { text: 'Admin', icon: <AdminIcon />, onClick: () => handleNavigation('admin') },
  ];

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 250,
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
          }}
          role="presentation"
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: theme.spacing(2) }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default BurgerMenu;