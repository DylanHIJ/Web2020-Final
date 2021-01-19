import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CourseInfo from "./CourseInfo";
import Assignments from "./Assignments";
import Exams from "./Exams";
import Grades from "./Grades";
import Members from "./Members";
import Settings from "./Settings";
import AssignmentTA from "./AssignmentTA";
import Grading from "../components/teachers/Grading";
import Assignment from "../components/students/Assignment";
import AddProblem from "../components/teachers/AddProblems";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import {
  AccountCircle,
  AssignmentRounded,
  EmojiObjectsRounded,
  Info,
  InsertChartRounded,
} from "@material-ui/icons";
import SettingsIcon from "@material-ui/icons/Settings";
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

export default function Course(props) {
  let isTA = false;
  if (props.location.state) isTA = props.location.state.isTA;
  const classes = useStyles();
  const match = useRouteMatch();
  const [open, setOpen] = useState(true);
  const drawerList = [
    {
      name: "Information",
      icon: <Info />,
      link: "",
      state: { isTA: isTA },
    },
    {
      name: "Assignments",
      icon: <AssignmentRounded />,
      link: "/assignments",
      state: { isTA: isTA },
    },
    {
      name: "Exams",
      icon: <EmojiObjectsRounded />,
      link: "/exams",
      state: { isTA: isTA },
    },
    {
      name: "Grades",
      icon: <InsertChartRounded />,
      link: "/grades",
      state: { isTA: isTA },
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar open={open} setOpen={setOpen} />
      <LeftDrawer
        drawerList={
          isTA
            ? [
                ...drawerList,
                {
                  name: "Members",
                  icon: <AccountCircle />,
                  link: "/members",
                  state: { isTA: isTA },
                },
                {
                  name: "Settings",
                  icon: <SettingsIcon />,
                  link: "/settings",
                  state: { isTA: isTA },
                },
              ]
            : drawerList
        }
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
            render={() => <Assignments isTA={isTA} />}
          />
          <Route
            exact
            path={`${match.path}/assignments/create`}
            render={() => <AddProblem create={true} />}
          />
          <Route
            exact
            path={`${match.path}/assignments/:aid?`}
            render={() =>
              isTA ? <AssignmentTA isTA={isTA} /> : <Assignment />
            }
          />
          <Route
            path={`${match.path}/assignments/:aid?/edit`}
            component={AddProblem}
          />
          <Route
            path={`${match.path}/assignments/:aid?/grading`}
            component={Grading}
          />
          <Route exact path={`${match.path}/exams`} component={Grading} />
          <Route exact path={`${match.path}/grades`} component={Grades} />
          {isTA ? (
            <>
              <Route exact path={`${match.path}/members`} component={Members} />
              <Route
                exact
                path={`${match.path}/settings`}
                component={Settings}
              />
            </>
          ) : (
            <></>
          )}
          <Redirect from={`${match.path}/info`} to={`${match}/`} />
        </Switch>
      </main>
    </div>
  );
}
