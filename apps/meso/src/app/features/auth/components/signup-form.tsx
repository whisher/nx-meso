// Core
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

// Intl
import { FormattedMessage } from 'react-intl';

// Material
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

// Material Icons
import MailIcon from '@material-ui/icons/MailRounded';
import LockIcon from '@material-ui/icons/LockRounded';
import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Types
import { AuthSignupFormData } from '../../../types';

// Custom Hooks
import { useForm } from '../../../shared/hooks';

// UI
import LoaderButton from '../../../shared/ui/loader-button/loader-button';

// Utils
import { isValid, isEmail } from '../../../shared/utils/validators';

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    'margin-bottom': theme.spacing(2),
  },
}));

export interface AuthSignupFormProps {
  isLoading: boolean;
  onSubmit: (data: AuthSignupFormData) => void;
}
export const authSignupFormInitialState: AuthSignupFormData = {
  username: '',
  email: '',
  password: '',
};
const AuthSignupForm = ({ isLoading, onSubmit }: AuthSignupFormProps) => {
  const classes = useStyles();
  const { state, bind } = useForm(authSignupFormInitialState);
  const { username, email, password } = state;
  const [isDisabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const { username, email, password } = state;
    const isValidForm =
      isValid(username) && isValid(password) && isEmail(email);
    setDisabled(!isValidForm);
    return () => {
      setDisabled(false);
    };
  }, [state]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: ChangeEvent<any>) => {
    e.preventDefault();
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <form onSubmit={submitHandler} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl className={classes.margin} fullWidth variant="outlined">
            <InputLabel required htmlFor="signup-username">
              <FormattedMessage id="auth.signup.label.username" />
            </InputLabel>
            <OutlinedInput
              id="signup-username" autoComplete="username"
              type="text"
              value={username}
              name="username"
              {...bind}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon color="disabled" />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FormControl className={classes.margin} fullWidth variant="outlined">
            <InputLabel required htmlFor="signup-email">
              <FormattedMessage id="auth.signup.label.email" />
            </InputLabel>
            <OutlinedInput
              id="signup-email" autoComplete="email"
              startAdornment={
                <InputAdornment position="start">
                  <MailIcon color="disabled" />
                </InputAdornment>
              }
              name="email"
              value={email}
              {...bind}
              labelWidth={60}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FormControl className={classes.margin} fullWidth variant="outlined">
            <InputLabel required htmlFor="signup-password">
              <FormattedMessage id="auth.login.label.password" />
            </InputLabel>
            <OutlinedInput
              id="signup-password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              {...bind}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon color="disabled" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <LoaderButton isDisabled={isDisabled} isLoading={isLoading}>
            <FormattedMessage id="auth.signup.label.submit" />
          </LoaderButton>
        </Grid>
      </Grid>
    </form>
  );
};
export default AuthSignupForm;
