import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import CourseCard from "./components/CourseCard";

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
    </Container>
  );
}
