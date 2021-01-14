import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "6%",
    marginBottom: "1%",
  },
  info: {
    marginTop: "3%",
  },
}));

export default function CourseInfo() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" component="h2" className={classes.title}>
        Course Name
      </Typography>
      <hr />
      <Typography component="p" className={classes.info}>
        course info course info course info
      </Typography>
    </>
  );
}
