// Core
import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Routing
import { Link } from 'react-router-dom';

// Intl
import { FormattedMessage } from 'react-intl';

// Material
import Alert from '@material-ui/lab/Alert';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Types
import { AuthLoginFormData } from '../../../types';

// Store
import { authLoginEffects, authReset } from '../../../store/auth';

// Hooks
import { useAuth } from '../../../shared/hooks';

// Components
import AuthLoginForm from '../components/login-form';

const useStyles = makeStyles((theme: Theme) => ({
  alert: {
    'margin-bottom': theme.spacing(2),
  },
  body1: {
    'margin-top': theme.spacing(3),
  },
  icon: {
    fontSize: '4.5em',
    color: theme.palette.secondary.main,
  },
  iconWrapper: {
    textAlign: 'center',
    'margin-bottom': theme.spacing(1),
  },
  link: {
    color: theme.palette.primary.main,
  },
}));

const AuthLogin = () => {
  const classes = useStyles();
  const { hasError, isLoading } = useAuth();
  const dispatch = useDispatch();
  const onSubmit = (data: AuthLoginFormData) => {
    dispatch(authLoginEffects(data));
  };

  useEffect(() => {
    dispatch(authReset());
  }, [dispatch]);

  return (
    <>
      <div className={classes.iconWrapper}>
        <LockOpenOutlinedIcon className={classes.icon} />
      </div>
      {hasError && (
        <Alert severity="error" className={classes.alert}>
          <FormattedMessage id="auth.login.error" />
        </Alert>
      )}
      <AuthLoginForm onSubmit={onSubmit} isLoading={isLoading} />
      <Typography className={classes.body1} variant="body1" gutterBottom>
        <FormattedMessage id="auth.login.hint" />{' '}
        <Link color="primary" to="/auth/signup">
          <FormattedMessage id="auth.login.signup" />
        </Link>
      </Typography>
    </>
  );
};
export default AuthLogin;
