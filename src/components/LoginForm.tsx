import LanguageSystem from '@/lang';
import AppConfig from '@/config';
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Stack } from '@mui/material';

const formStyles = {
  padding: '2rem',
};

/**
 * LoginForm component props
 */
interface LoginFormProps {
  handleSubmit: (nickname: string) => void;
}

/**
 * LoginForm component
 * @param {LoginFormProps} props - Component props
 * @returns {JSX.Element} - LoginForm component
 */
const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
}: LoginFormProps): JSX.Element => {
  const [nicknameState, setNicknameState] = useState('');

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameState(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(nicknameState);
  };

  return (
    <Paper elevation={0} style={formStyles}>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={2}>
          <Typography variant="h4" component="h1">
            {LanguageSystem.getTranslation('greeting')}
          </Typography>
          <Typography color="secondary" variant="h6" component="h2">
            {LanguageSystem.getTranslation('greetingText')}
          </Typography>
          <TextField
            variant={'outlined'}
            color={'secondary'}
            label={LanguageSystem.getTranslation('nickname')}
            size={'small'}
            value={nicknameState}
            onChange={handleNicknameChange}
            required
            fullWidth
            inputProps={{ maxLength: AppConfig.maxNicknameLength }}
          />
          <Button type="submit" variant="outlined" color="secondary" fullWidth>
            {LanguageSystem.getTranslation('login')}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default LoginForm;
