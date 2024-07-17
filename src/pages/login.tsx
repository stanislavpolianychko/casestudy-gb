import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.id) {
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let response = await axios.get(
        `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users?email=${email}`,
      );

      console.log('we are here');
      if (response.data.length === 0) {
        // User does not exist, create a new user
        response = await axios.post(
          'https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users',
          { email },
        );
      }

      // Save user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data[0]));
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(45deg, rgba(173, 216, 230, 0.8), rgba(255, 235, 205, 0.8), rgba(173, 216, 230, 0.8))',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          // type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
}
