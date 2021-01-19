import Cookies from "js-cookie";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Fab, Grid, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import CourseCard from "./components/CourseCard";
import NewCourseDialog from "./components/NewCourseDialog";
import { useQuery } from "@apollo/client";
import { GET_USER_COURSES } from "../graphql";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "6%",
    marginBottom: "1%",
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

  if (loading) return <Loading />;

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
      <hr />
      {data.user.studentCourses.length === 0 &&
      data.user.teacherCourses.length === 0 ? (
        <Typography variant="h5" component="h2" className={classes.subtitle}>
          No courses yet.
        </Typography>
      ) : (
        <></>
      )}
      {data.user.studentCourses.length !== 0 ? (
        <Typography variant="h5" component="h2" className={classes.subtitle}>
          Student Courses
        </Typography>
      ) : (
        <></>
      )}
      <Grid container spacing={4}>
        {data.user.studentCourses.map((course) => (
          <Grid key={course._id} item xs={4}>
            <CourseCard course={course} isTA={false} />
          </Grid>
        ))}
      </Grid>
      {data.user.teacherCourses.length !== 0 ? (
        <Typography variant="h5" component="h2" className={classes.subtitle}>
          TA Courses
        </Typography>
      ) : (
        <></>
      )}
      <Grid container spacing={4}>
        {data.user.teacherCourses.map((course) => (
          <Grid key={course._id} item xs={4}>
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
