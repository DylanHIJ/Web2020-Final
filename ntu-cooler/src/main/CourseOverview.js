import Cookies from "js-cookie";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Fab, Grid, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import CourseCard from "./components/CourseCard";
import NewCourseDialog from "./components/NewCourseDialog";
import { useQuery } from "@apollo/client";
import { GET_USER_COURSES } from "../graphql";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
  subtitle: {
    marginTop: "3%",
    marginBottom: "2%",
  },
}));

export default function CourseOverview() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { loading, data } = useQuery(GET_USER_COURSES, {
    variables: { token: Cookies.get("token") },
  });

  if (loading) return "Loading";
  // const courses = [
  //   {
  //     name: "Computer Security",
  //     id: "CSIE7016",
  //   },
  //   {
  //     name: "Psychology",
  //     id: "PSY1007-04",
  //   },
  //   {
  //     name: "Machine Learning",
  //     id: "CSIE1126",
  //   },
  //   {
  //     name: "Web Programming",
  //     id: "EE9983",
  //   },
  //   {
  //     name: "Data Structure and Algorithm",
  //     id: "CSIE1111",
  //   },
  //   {
  //     name: "Linear Algebra",
  //     id: "CSIE3267",
  //   },
  // ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" className={classes.title}>
        Course Overview
      </Typography>
      <Typography variant="h5" component="h2" className={classes.subtitle}>
        Student
      </Typography>
      <Grid container spacing={4}>
        {data.user.studentCourses.map((course) => (
          <Grid key={course.name} item xs={4}>
            <CourseCard course={course} isTA={false} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" component="h2" className={classes.subtitle}>
        TA
      </Typography>
      <Grid container spacing={4}>
        {data.user.teacherCourses.map((course) => (
          <Grid key={course.name} item xs={4}>
            <CourseCard course={course} isTA={true} />
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", right: "5%", bottom: "5%" }}
        onClick={handleClickOpen}
      >
        <Add />
      </Fab>
      <NewCourseDialog open={open} handleClose={handleClose} />
    </Container>
  );
}
