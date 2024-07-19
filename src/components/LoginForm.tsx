import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Stack } from '@mui/material';
import LanguageSystem from '@/lang';

interface LoginFormProps {
  handleSubmit: (nickname: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit }) => {
  const [nicknameState, setEmailState] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(nicknameState);
  };

  return (
    <Paper elevation={0} style={{ padding: '2rem' }}>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={2}>
          <Typography variant="h4" component="h1">
            {LanguageSystem.getTranslation('greeting')}
          </Typography>
          <Typography sx={{ color: '#6B69D9' }} variant="h6" component="h2">
            {LanguageSystem.getTranslation('greetingText')}
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
            inputProps={{ maxLength: 5 }}
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
