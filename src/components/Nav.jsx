import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home'; // example icon
import { Divider } from '@mui/material';
import THAI from '../assets/thailand.png';
import UK from '../assets/united-kingdom.png';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [language, setLanguage] = React.useState('THAI');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();


  const handleMenu1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = (selectedLanguage) => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
    setAnchorEl1(null);
  };

  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
 localStorage.clear();
    navigate('/login');
  };

  const flagIcon = language === 'THAI' ? THAI : UK;
  // const username = language === 'THAI' ? 'ผู้ใช้งาน' : 'Username';
  const logoutText = language === 'THAI' ? 'ออกจากระบบ' : 'Logout';
  const currency = language === 'THAI' ? 'บาท' : 'THB';
  const balance = 350

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
      setUserName(storedUserName);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>

          {/* icon button here */}
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              RYG Company
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ height: 28, alignSelf: 'center', mx: 1, bgcolor: 'white' }} />
            <AccountBalanceWalletIcon sx={{ color: 'white' ,width: 20, mr:1}} />
            {balance} {currency}
          </Box>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
            <img src={flagIcon} alt="Flag" style={{ width: 24, height: 24, marginRight: 8 }} />
            <IconButton
              size="large"
              aria-label="language selection"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu1}
              color="inherit"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl1}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl1)}
            onClose={() => handleClose1(null)}
          >
            <MenuItem onClick={() => handleClose1('THAI')}>ไทย</MenuItem>
            <MenuItem onClick={() => handleClose1('UK')}>English</MenuItem>
          </Menu> */}
          <Divider orientation="vertical" flexItem sx={{ height: 28, alignSelf: 'center', mx: 1, bgcolor: 'white' }} />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu2}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Typography variant="body2" color="inherit" sx={{ ml: 1, marginRight: 2 }}>
            {userName}
          </Typography>
          <Menu
           sx={{ mt: '40px' }}
            id="menu-appbar"
            anchorEl={anchorEl2}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
          >
            <MenuItem onClick={handleClose2}>Profile</MenuItem>
            <MenuItem onClick={handleClose2}>My account</MenuItem>
          </Menu>
          <Button color="inherit" onClick={handleLogout}>{logoutText}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
