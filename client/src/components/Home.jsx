import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <div id='background'>
          <h1 className="text-4xl font-bold">Mire se vini!</h1>
          <div className="mt-4">
            <Button id='btn' component={Link} to="/auth" variant="contained" color="primary" className="mr-4">
              Klient
            </Button>
            <Button id='btn2' component={Link} to="/AdminAuth" variant="contained" color="primary">
              Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;