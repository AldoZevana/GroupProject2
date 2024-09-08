import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, TextField } from '@mui/material';

const NavBar = ({ loggedIn, user, handleLogout, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menu');
    window.scrollTo(0, 0);
  };
  const handleCartClick = () => {
    navigate('/cart');
  };
  
  const handleOrdersClick = () => {
    navigate('/orders');
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/auth');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: 'orange', height: '70px', marginBottom: '90px' }}>
        <Toolbar>
          <Typography onClick={handleMenuClick} variant="h1" component="div" sx={{ flexGrow: 0.5, fontSize: '40px' }}>
            FooDish
          </Typography>
          {loggedIn ? (
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                label="Kerko ushqimin..."
                variant="outlined"
                onChange={handleSearchChange}
                size="small"
              />
              {user ? (
                <Typography sx={{ fontSize: '20px' }} variant="body1">Mire se vjen, {user.firstName}!</Typography>
              ) : (
                <Typography variant="body1">Loading...</Typography>
              )}
              <Button sx={{ fontSize: '20px' }} color="inherit" onClick={handleMenuClick}>Menu</Button>
              <Button sx={{ fontSize: '20px' }} color="inherit" onClick={handleCartClick}>Karta</Button>
              <Button sx={{ fontSize: '20px' }} color="inherit" onClick={handleOrdersClick}>Porosite</Button>
              <Button sx={{ fontSize: '20px' }} color="inherit" onClick={handleLogoutClick}>Logout</Button>
            </Box>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <main style={{ marginTop: '100px' }}>
        {}
      </main>
    </div>
  );
};

export default NavBar;
