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
import LockIcon from '@material-ui/icons/LockRounded';
import MailIcon from '@material-ui/icons/MailRounded';
import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Types
import { AuthLoginFormData } from '../../../types';

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

export interface AuthLoginFormProps {
  isLoading: boolean;
  onSubmit: (data: AuthLoginFormData) => void;
}

const AuthLoginForm = ({ isLoading, onSubmit }: AuthLoginFormProps) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const initialState: AuthLoginFormData = {
    email: '',
    password: '',
  };

  const { state, bind } = useForm(initialState);
  const { email, password } = state;

  useEffect(() => {
    const { email, password } = state;
    const isValidForm = isEmail(email) && isValid(password);
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
      <Grid container>
        <Grid item xs={12}>
          <FormControl className={classes.margin} fullWidth variant="outlined">
            <InputLabel required htmlFor="auth-email">
              <FormattedMessage id="auth.login.label.email" />
            </InputLabel>
            <OutlinedInput
              id="auth-email"
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
            <InputLabel required htmlFor="auth-password">
              <FormattedMessage id="auth.login.label.password" />
            </InputLabel>
            <OutlinedInput
              id="auth-password"
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
            <FormattedMessage id="auth.login.label.submit" />
          </LoaderButton>
        </Grid>
      </Grid>
    </form>
  );
};
export default AuthLoginForm;
