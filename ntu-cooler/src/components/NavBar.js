import Cookies from "js-cookie";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  navlink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function NavBar(props) {
  const { open, setOpen } = props;
  const classes = useStyles();

  const handleClick = async () => {
    await Cookies.remove("token");
    window.location.pathname = "";
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const menuId = "primary-search-account-menu";

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <NavLink to="/home" className={classes.navlink}>
            <Typography variant="h6" noWrap>
              NTU COOLER
            </Typography>
          </NavLink>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button variant="outlined" onClick={handleClick} color="inherit">
              Logout
            </Button>
            <NavLink to="/account" className={classes.navlink}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
