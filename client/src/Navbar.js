import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuth0 } from "@auth0/auth0-react";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className={classes.root} style={{ margin: "0px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            RestaurantsHub
          </Typography>
          {isAuthenticated && <div>Welcome {user.name}</div>}
          {isAuthenticated && (
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          )}
          {!isAuthenticated && (
            <Button color="inherit" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
