import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CourseOverview from "./CourseOverview";
import { useRouteMatch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { Apps } from "@material-ui/icons";
import LeftDrawer from "../components/LeftDrawer";
import NavBar from "../components/NavBar";

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

const drawerWidth = 240;

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const match = useRouteMatch();

  const drawerList = [
    {
      name: "Courses",
      icon: <Apps />,
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
        <CourseOverview />
      </main>
    </div>
  );
}
