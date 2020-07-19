import React, { Suspense } from 'react';

// Routing
import { Switch, Redirect, Route } from 'react-router-dom';

// Material
import Container from '@material-ui/core/Container';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Components
import Loader from './loader';

// Hooks
import { useAuth } from '../shared/hooks';

// Lazy Loading
const Auth = React.lazy(() => import('../features/auth/auth.router'));
const Home = React.lazy(() => import('../features/home/home'));
const Posts = React.lazy(() => import('../features/posts/posts'));

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: '1 1 auto',
  },
}));

const Main = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  return (
    <main className={classes.root}>
      <Suspense fallback={<Loader></Loader>}>
        <Container maxWidth="md">
          <Switch>
            <Route path="/auth">
              {isAuthenticated ? (
                <Redirect from="/auth" to="/home" />
              ) : (
                <Auth />
              )}
            </Route>
            <Route path="/" exact>
              {isAuthenticated ? <Posts /> : <Home />}
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </Container>
      </Suspense>
    </main>
  );
};

export default Main;
