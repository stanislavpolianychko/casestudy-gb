import { Grid } from '@mui/material';
import React from 'react';
import LoginForm from '@/components/LoginForm';
import Paths from '@/enums/paths';
import UserAuthService from '@/services/userAuthService';
import AppConfig from '@/config';
import User from '@/dto/user';

export default function Login() {
  const onLoginSuccess = (user: User) => {
    localStorage.setItem(AppConfig.userLocalStorageKey, JSON.stringify(user));
    window.location.href = Paths.Home;
  };

  const handleLogin = async (nickname: string) => {
    const user = await UserAuthService.login(nickname);
    if (user) {
      onLoginSuccess(user);
    }
  };

  const handleSubmit = async (nickname: string) => {
    try {
      await handleLogin(nickname);
    } catch (error) {
      console.log(`Failed to login: ${error}`);
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
