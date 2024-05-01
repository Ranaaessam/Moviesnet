import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MovieFilterSharpIcon from '@mui/icons-material/MovieFilterSharp';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'Favourites', path: '/favourites' },
  // { name: 'Profile', path: '/profile' },
  { name: 'Add Movie', path: '/add' },

];

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {

  window.location.href = '/login';
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#212121', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieFilterSharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} fontSize="large" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cinema<span style={{ color: 'red' }}>Zone</span>
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ color: 'white', marginRight: '10px' }}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
                        <Button
              key="Login"
              sx={{ color: 'white', marginRight: '10px' }}
              component={Link}
              to="/login"
            >
           Login
            </Button>
            <Button
              key="Signup"
              sx={{ color: 'white', marginRight: '10px' }}
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
            <Button
              key="Profile"
              sx={{ color: 'white', marginRight: '10px' }}
              component={Link}
              to="/profile"
            >
              Profile
            </Button>
            <Button
              key="Logout"
              sx={{ color: 'white' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
