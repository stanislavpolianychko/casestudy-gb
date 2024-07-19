import UserAuthService from '@/services/userAuthService';
import LoginForm from '@/components/LoginForm';
import Paths from '@/enums/paths';
import AppConfig from '@/config';
import React from 'react';
import { Grid } from '@mui/material';

/**
 * Login is a React component that renders a login form.
 * It handles the form submission by calling the `UserAuthService.login` method.
 * If the login is successful, it stores the user data in localStorage and redirects the user to the home page.
 */
function Login() {
  const handleSubmit = async (nickname: string) => {
    try {
      const user = await UserAuthService.login(nickname);
      if (user) {
        localStorage.setItem(
          AppConfig.userLocalStorageKey,
          JSON.stringify(user),
        );
        window.location.href = Paths.Home;
      }
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

export default Login;
