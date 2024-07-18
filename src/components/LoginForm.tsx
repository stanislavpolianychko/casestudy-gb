import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Stack } from '@mui/material';

interface LoginFormProps {
  nickname: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ nickname, handleSubmit }) => {
  const [nicknameState, setEmailState] = useState(nickname);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
  };

  return (
    <Paper elevation={0} style={{ padding: '2rem' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h4" component="h1">
            Hello!
          </Typography>
          <Typography sx={{ color: '#6B69D9' }} variant="h6" component="h2">
            Please, enter your nickname to start a TODO!
          </Typography>
          <TextField
            variant={'outlined'}
            color={'secondary'}
            label="Nickname"
            size={'small'}
            value={nicknameState}
            onChange={handleEmailChange}
            required
            fullWidth
          />
          <Button type="submit" variant="outlined" color="secondary" fullWidth>
            Login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default LoginForm;
