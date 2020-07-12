// Core
import React from "react";
import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom";

// Material
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { AuthConfirm, AuthLogin, AuthSignUp } from "./pages";

const Auth = () => {
  let { path } = useRouteMatch();
  return (
    <Container maxWidth="md">
      <Paper>
        <Grid container justify="center">
          <Grid item xs={12} sm={10} lg={8}>
            <Card variant="outlined">
              <Box py={3} px={4}>
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
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default Auth;
