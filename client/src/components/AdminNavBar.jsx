import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const AdminNavBar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleOrdersClick = () => {
    navigate('/admin/orders');
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/AdminAuth');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'orange', height: '70px', marginBottom: '90px' }}>
      <Toolbar>
        <Typography variant="h1" component="div" sx={{ flexGrow: 0.5, fontSize: '40px' }}>
          FooDish
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Button sx={{ fontSize: '20px' }} color="inherit" onClick={handleOrdersClick}>Porosite</Button>
          <Button sx={{ fontSize: '20px' }} color="inherit" onClick={handleLogoutClick}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavBar;