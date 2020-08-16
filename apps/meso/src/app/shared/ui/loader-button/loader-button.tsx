import React, { ReactNode } from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    display: "block",
    width: "100%",
    height: "3rem",
    color: "#ffffff",
  },
}));
export interface LoaderButtonProps {
  isDisabled: boolean;
  isLoading: boolean;
  children: ReactNode;
}
const LoaderButton = ({
  isDisabled,
  isLoading,
  children,
}: LoaderButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      disabled={isDisabled}
      variant="contained"
      color={isDisabled ? "default" : "primary"}
      type="submit"
      className={classes.button}
    >
      {isLoading ? (
        <CircularProgress style={{ color: "white" }} size={20} />
      ) : (
        children
      )}
    </Button>
  );
};

export default LoaderButton;
