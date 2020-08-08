import React, { Suspense } from 'react';

// Routing
import { Switch, Redirect, Route } from 'react-router-dom';

// Components
import Loader from './loader';

// Lazy Loading
const Auth = React.lazy(() => import('../features/auth/auth.router'));
const Home = React.lazy(() => import('../features/home/home'));
const Posts = React.lazy(() => import('../features/posts/posts'));

export interface RouterProps {
  isAuthenticated: boolean;
}
const Router = ({ isAuthenticated }: RouterProps) => {
  return (
    <Suspense fallback={<Loader></Loader>}>
      <Switch>
        <Route path="/auth">
          {isAuthenticated ? <Redirect from="/auth" to="/home" /> : <Auth />}
        </Route>
        <Route path="/" exact>
          {isAuthenticated ? <Posts /> : <Home />}
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Suspense>
  );
};

export default Router;
