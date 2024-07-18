import { Grid } from '@mui/material';
import React from 'react';
import axios from 'axios';
import LoginForm from '@/components/LoginForm';

export default function Login() {
  const handleSubmit = async (nickname: string) => {
    try {
      let response = await axios.get(
        `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users?nickname=${nickname}`,
      );

      if (response.status != 200 || response?.data?.length === 0) {
        console.log('User not found, creating new user');
        response = await axios.post(
          'https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users',
          { nickname },
        );
      }

      console.log('response', response);
      localStorage.setItem('user', JSON.stringify(response.data[0]));
      window.location.href = '/';
    } catch (error) {
      console.log('User not found, creating new user');
      let response = await axios.post(
        'https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users',
        { nickname },
      );

      localStorage.setItem('user', JSON.stringify(response.data));
      window.location.href = '/';
    }
  };

  return (
    <Grid container direction="column">
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        style={{ flexGrow: 1 }}
      >
        <LoginForm handleSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
}
