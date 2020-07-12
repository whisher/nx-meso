// Core
import React from "react";
import { Link } from "react-router-dom";

// Material
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Material Theme
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const useStyles = makeStyles((theme: Theme) => ({
  h2: {
    color: theme.palette.primary.main,
  },
  body1: {
    "margin-bottom": theme.spacing(2),
  },
}));
const AuthConfirm = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.h2} variant="h2" gutterBottom>
        Welcome to Meso
      </Typography>

      <Typography className={classes.body1} variant="body1" gutterBottom>
        You can now access your reserved area by entering the credentials you
        have provided
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to={"/auth/login"}
      >
        Login
      </Button>
    </div>
  );
};

export default AuthConfirm;
