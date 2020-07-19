// Core
import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';

// Material
import Grid from '@material-ui/core/Grid';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { AuthConfirm, AuthLogin, AuthSignUp } from './pages';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    'margin-top': theme.spacing(3),
  },
}));
const Auth = () => {
  const classes = useStyles();
  let { path } = useRouteMatch();
  return (
    <Grid className={classes.root} container justify="center">
      <Grid item xs={10} sm={6} lg={4}>
        <Switch>
          <Route path={`${path}/confirm`} exact>
            <AuthConfirm />
          </Route>
          <Route path={`${path}/login`} exact>
            <AuthLogin />
          </Route>
          <Route path={`${path}/signup`} exact>
            <AuthSignUp />
          </Route>
          <Redirect from={path} to={`${path}/login`} />
        </Switch>
      </Grid>
    </Grid>
  );
};
export default Auth;
