import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { FormControl, FormControlLabel } from '@mui/material';
import '../stylesheets/Menu.css';

const drawerWidth = 240;
const navItems = ['Motivation', 'Milestones', 'Mindfulness'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = props;
  //   const { prefs, setPrefs } = props;
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  console.log('HERE ARE THE PREFS THAT ABSOLUTELY SHOULD BE LOADING:', props.prefs);
  navItems.map((item, index) => {
    console.log(`${item}: ${props.prefs[item]}`);
  });

  //   const handlePrefToggle = () = {

  //   }

  const handlePrefsChange = (event, prefs = props.prefs, setPrefs = props.setPrefs) => {
    const isChecked = event.target.checked;
    const preference = navItems[event.target.id]; // .toLowerCase();
    // access the event to get either motiviation, milestone, or mindfulness
    const newPrefs =
    // make target equal either "motivation", "milestone", or "mindfulness"
    {
      Motivation: prefs.Motivation,
      Milestones: prefs.Milestones,
      Mindfulness: prefs.Mindfulness,
    };
    newPrefs[preference] = isChecked;

    const url = 'http://localhost:3000/api/users';
    fetch(`${url}?userName=${props.user.userName}`, {
      method: 'PATCH',
      body: JSON.stringify({
        preferences: newPrefs,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('successfully patched preferences: ', json);
        setPrefs(newPrefs);
      })
      .catch((err) => console.log(err));
  };

  // NOTE: when the user loads their page, it should load their saved preferences

  const drawer = (

    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Get Swell
      </Typography>
      <Divider />
      <List>
        <h3>{user.userName}</h3>

        {navItems.map((item, index) => (
          <ListItem className="prefs" key={item} disablePadding>
            <FormControlLabel
              control={
                <Switch checked={props.prefs[item]} className="switch" id={`${index}`} sx={{ textAlign: 'center', marginLeft: '40px' }} onChange={(e) => handlePrefsChange(e)} />
              }
              label={item}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#647ead' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Get Swell
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#647ead' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          We hope you have a swell day!
        </Typography>
      </Box>
    </Box>

  );
}

export default DrawerAppBar;
