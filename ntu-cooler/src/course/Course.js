import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CourseInfo from "./CourseInfo";
import Assignments from "./Assignments";
import Exams from "./Exams";
import Grades from "./Grades";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import {
  AssignmentRounded,
  EmojiObjectsRounded,
  Info,
  InsertChartRounded,
} from "@material-ui/icons";
import NavBar from "../components/NavBar";
import LeftDrawer from "../components/LeftDrawer";

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

export default function App() {
  const classes = useStyles();
  const match = useRouteMatch();
  const [open, setOpen] = useState(true);

  const drawerList = [
    {
      name: "Information",
      icon: <Info />,
      link: "",
    },
    {
      name: "Assignments",
      icon: <AssignmentRounded />,
      link: "/assignments",
    },
    {
      name: "Exams",
      icon: <EmojiObjectsRounded />,
      link: "/exams",
    },
    {
      name: "Grades",
      icon: <InsertChartRounded />,
      link: "/grades",
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
          <Route exact path={`${match.path}/`} component={CourseInfo} />
          <Route
            exact
            path={`${match.path}/assignments`}
            component={Assignments}
          />
          <Route exact path={`${match.path}/exams`} component={Exams} />
          <Route exact path={`${match.path}/grades`} component={Grades} />
          <Redirect from={`${match.path}/info`} to={`${match}/`} />
        </Switch>
      </main>
    </div>
  );
}
