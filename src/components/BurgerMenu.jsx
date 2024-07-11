import {
  AdminPanelSettings as AdminIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Menu as MenuIcon
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

const BurgerMenu = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const handleNavigation = (page) => {
    if (page === 'admin') {
      setIsLoginOpen(true);
    } else {
      onNavigate(page);
    }
    setIsOpen(false);
  };

  const handleLogin = () => {
    if (username === import.meta.env.VITE_ADMIN_USERNAME && password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsLoginOpen(false);
      onNavigate('admin');
    } else {
      alert('Invalid credentials');
    }
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