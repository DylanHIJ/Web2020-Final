import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import { LibraryBooks, Favorite } from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
  const { course } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <NavLink to={`/courses/${course.name}`}>
        <CardMedia
          className={classes.media}
          image="/defaultCourseImg.jpeg"
          title="Paella dish"
        />
      </NavLink>

      <NavLink to={`/courses/${course.name}`} className={classes.navlink}>
        <CardHeader
          className={classes.header}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={course.name}
          subheader={course.teacher}
        ></CardHeader>
      </NavLink>

      <CardActions disableSpacing className={classes.actions}>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <LibraryBooks />
        </IconButton>
      </CardActions>
      <div style={{ height: 64 }} />
    </Card>
  );
}
