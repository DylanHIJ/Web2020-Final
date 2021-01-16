import clsx from "clsx";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import NavBar from "../components/NavBar";
import LeftDrawer from "../components/LeftDrawer";
import AccountEdit from "./AccountEdit";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Account() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const match = useRouteMatch();

  const drawerList = [
    {
      name: "Profile",
      icon: <AccountCircle />,
      link: "",
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar open={open} setOpen={setOpen} />
      <LeftDrawer
        drawerList={drawerList}
        open={open}
        setOpen={setOpen}
        match={match}
      />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Switch>
          <Route to={`${match.url}/`} component={AccountEdit} />
        </Switch>
      </main>
    </div>
  );
}
