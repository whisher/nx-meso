// Core
import React, { useEffect, useState } from 'react';

// Routing
import { Link, useHistory } from 'react-router-dom';

// Intl
import { FormattedMessage } from 'react-intl';

// Material
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Services
import { AuthService } from '../../../services';

// Types
import { AuthSignupFormData } from '../../../types';

// Components
import AuthSignupForm, {
  authSignupFormInitialState,
} from '../components/signup-form';

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    'padding': theme.spacing(2),
  },
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
}));

const AuthSignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState<boolean>(false);
  const [formData, setFormData] = useState<AuthSignupFormData>(
    authSignupFormInitialState
  );
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      AuthService.signup(formData)
        .then(() => {
          history.push('/auth/confirm');
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return () => {
      setFormData(authSignupFormInitialState);
      setLoading(false);
    };
  }, [history, isLoading, formData]);

  const onSubmit = (data: AuthSignupFormData) => {
    setLoading(true);
    setFormData(data);
  };
  return (
    <Card className={classes.root}>
      <div className={classes.iconWrapper}>
        <PersonAddOutlinedIcon className={classes.icon} />
      </div>
      {error && (
        <Alert severity="error" className={classes.alert}>
          Oops something went wrong
        </Alert>
      )}
      <AuthSignupForm onSubmit={onSubmit} isLoading={isLoading} />
      <Typography className={classes.body1} variant="body1" gutterBottom>
        <FormattedMessage id="auth.signup.hint" />{' '}
        <Link color="primary" to="/auth/login">
          <FormattedMessage id="auth.signup.login" />
        </Link>
      </Typography>
    </Card>
  );
};
export default AuthSignUp;
