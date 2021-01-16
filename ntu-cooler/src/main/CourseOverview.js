import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Fab, Grid, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import CourseCard from "./components/CourseCard";
// import NewCourseDialog from "./components/NewCourseDialog";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const courses = [
    {
      name: "Computer Security",
      id: "CSIE7016",
    },
    {
      name: "Psychology",
      id: "PSY1007-04",
    },
    {
      name: "Machine Learning",
      id: "CSIE1126",
    },
    {
      name: "Web Programming",
      id: "EE9983",
    },
    {
      name: "Data Structure and Algorithm",
      id: "CSIE1111",
    },
    {
      name: "Linear Algebra",
      id: "CSIE3267",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" className={classes.title}>
        Course Overview
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid key={course.id} item xs={4}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", right: "5%", bottom: "5%" }}
      >
        <Add />
      </Fab>
      {/* <NewCourseDialog
        open={open}
        onClose={handleClose}
      /> */}
    </Container>
  );
}
