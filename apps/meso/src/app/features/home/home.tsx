// Core
import React from "react";
import { Link } from "react-router-dom";

// Material
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// Material Theme
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

// Intl
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme: Theme) => ({
  h2: {
    color: theme.palette.primary.main,
  },
  body1: {
    "margin-bottom": theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Typography className={classes.h2} variant="h2" gutterBottom>
        <FormattedMessage id="home.header" />
      </Typography>
      <Typography variant="h3" gutterBottom>
        <FormattedMessage id="home.subheader" />
      </Typography>
      <Typography className={classes.body1} variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to={"/auth/signup"}
      >
        Sign up its free!
      </Button>
    </Container>
  );
};

export default Home;
