import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { LibraryBooks } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    height: "100%",
    position: "relative",
  },
  header: {
    overflow: "hidden",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  navlink: {
    color: "inherit",
    textDecoration: "none",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    position: "absolute",
    bottom: 0,
  },
}));

export default function CourseCard(props) {
  const { course, isTA } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <NavLink
        to={{
          pathname: `/courses/${course._id}`,
          state: {
            isTA: isTA,
          },
        }}
      >
        <CardMedia
          className={classes.media}
          image="/defaultCourseImg.jpg"
          title={`${course.info.name}`}
        />
      </NavLink>

      <NavLink
        to={{
          pathname: `/courses/${course._id}`,
          state: {
            isTA: isTA,
          },
        }}
        className={classes.navlink}
      >
        <CardHeader
          className={classes.header}
          title={course.info.name}
          subheader={course.info.teacher}
        ></CardHeader>
      </NavLink>

      <CardActions disableSpacing className={classes.actions}>
        <NavLink
          to={{
            pathname: `/courses/${course._id}/assignments`,
            state: {
              isTA: isTA,
            },
          }}
          className={classes.navlink}
        >
          <IconButton aria-label="share">
            <LibraryBooks />
          </IconButton>
        </NavLink>
      </CardActions>
      <div style={{ height: 64 }} />
    </Card>
  );
}
