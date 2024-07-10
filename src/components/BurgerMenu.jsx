import { AdminPanelSettings as AdminIcon, Home as HomeIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import React, { useState } from 'react';

const BurgerMenu = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === import.meta.env.VITE_ADMIN_USERNAME && password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsLoginOpen(false);
      onNavigate('admin');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleNavigation = (page) => {
    setIsOpen(false);
    if (page === 'admin') {
      setIsLoginOpen(true);
    } else {
      onNavigate(page);
    }
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setIsOpen(true)}
        sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <List>
          <ListItem button onClick={() => handleNavigation('home')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('admin')}>
            <ListItemIcon><AdminIcon /></ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
        </List>
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
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained">Login</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BurgerMenu;