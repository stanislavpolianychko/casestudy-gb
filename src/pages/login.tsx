import { Box, Button, TextField, Grid, Paper, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';

export default function Login() {
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.id) {
      // window.location.href = '/';
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
    <Grid container direction="column" style={{ minHeight: '100vh' }}>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        style={{ flexGrow: 1 }}
      >
        <LoginForm email={email} handleSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
}
