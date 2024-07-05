import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { post, setAuthToken } from '../../service/requestHandlers';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
//   boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const LoginPage = () => {

  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
          const response = await post('/login', { username, password });

          const token = response.data.access_token;
          localStorage.setItem('token', token);
          setAuthToken(token);
          navigate('/overview'); 
          
        } catch (error) {
          console.error('Error registering', error);
          // Handle registration error
        }
      };
      
  return (
    <StyledContainer maxWidth="xs">
      <StyledBox>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledTextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </StyledBox>
    </StyledContainer>
  );
};

export default LoginPage;
