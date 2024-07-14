import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RadarIcon from '@mui/icons-material/Radar';
import { useNavigate } from 'react-router-dom';

const SharedAppBar = ({ title, showBackButton = false, actionButton = null }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (path) => {
    if (path === '/admin') {
      setIsLoginOpen(true);
    } else {
      navigate(path);
    }
    setIsDrawerOpen(false);
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
    { text: 'Admin', icon: <AdminPanelSettingsIcon />, onClick: () => handleNavigation('/admin') },
  ];

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{
          pl: { xs: theme.spacing(2), sm: theme.spacing(3) },
          pr: theme.spacing(2),
        }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: theme.spacing(2) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={isMobile ? "h6" : "h5"} component="h1" sx={{ flexGrow: 1, fontWeight: theme.typography.fontWeightMedium }}>
            {title}
          </Typography>
          {actionButton}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 250,
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleDrawerToggle}>
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

export default SharedAppBar;