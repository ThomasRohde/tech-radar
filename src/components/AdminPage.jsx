import { Box, Typography } from '@mui/material';
import React from 'react';

const AdminPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Admin Page</Typography>
      <Typography variant="body1">Welcome to the admin page. Here you can manage your technology radar data.</Typography>
    </Box>
  );
};

export default AdminPage;