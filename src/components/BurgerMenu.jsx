/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  AdminPanelSettings as AdminIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  RadioButtonChecked as RadarIcon  // Changed this line
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const handleNavigation = (path) => {
    if (path === '/admin') {
      setIsLoginOpen(true);
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const handleLogin = () => {
    if (username === import.meta.env.VITE_ADMIN_USERNAME && password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsLoginOpen(false);
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, onClick: () => handleNavigation('/') },
    { text: 'Custom Radars', icon: <RadarIcon />, onClick: () => handleNavigation('/custom-radars') },
    { text: 'Admin', icon: <AdminIcon />, onClick: () => handleNavigation('/admin') },
  ];

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(0, 0, 0, 0)',
      },
    },
    '& .MuiInputLabel-root': {
      backgroundColor: 'white',
      padding: '0 4px',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'rgba(0, 0, 0, 0.6)',
    },
  };

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
      <Dialog open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={textFieldSx}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={textFieldSx}
            />
            <Button type="submit" variant="contained">Login</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BurgerMenu;