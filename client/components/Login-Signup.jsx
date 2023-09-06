// for '/register' page
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CSSBaseline from '@mui/material/CssBaseline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

//add import MUI material UI


//container--| username
//         --| password
//         --| login button
//         --| signup button
const LoginSignup = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username =  data.get('username');
    const password = data.get('password');
    const email = data.get('email');
    //Send the info to the database
    const serverResponse = await fetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password })
    })
      .catch(err => {
        console.log(err);
      });
    const parsedResponse = await serverResponse.json();
    console.log(parsedResponse);
  };

    
    return (
      <Container component='main' maxWidth='xs'>
        <CSSBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            p: 3,
            mb: 6,
            borderRadius: 15,
            color: 'white',
            backgroundColor: 'error.light',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

          }}>
            <Typography component="h1" variant='h1'>
              CodeForge
            </Typography>
          </Box>
          <Avatar sx={{ m: 2, bgcolor: 'error.light' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            /> 
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* If we want to implement the ability to 'remember' a user's username and password info <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>  
          </Box>
          <Link href="/" variant="body2">
            {"Already have an account? Log in"}
          </Link>
        </Box>
      </Container>
    )
};
  
export default LoginSignup;