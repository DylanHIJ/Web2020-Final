import React, { useState } from "react";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import CorrectionModule from "./corrections";
import { getAssignment, getProblems, getStudentList } from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
  quarter: {
    float: "left",
    width: "20%",
  },
  half: {
    float: "left",
    width: "60%",
  },
  row: {},
}));

const Correction = (props) => {
  const { assignmentID } = props;

  const classes = useStyles();

  const assignment = getAssignment(assignmentID);
  const problems = getProblems(assignmentID);
  const studentList = getStudentList(assignmentID);

  console.log(problems);

  const [problemIndex, setProblemIndex] = useState(0);
  const [problem, setProblem] = useState(problems[0]);

  const [studentIndex, setStudentIndex] = useState(0);

  return (
    <Container maxWidth="lg">
      {/* Assignment Name */}
      <Typography variant="h4" component="h2" className={classes.title}>
        {assignment.name} (Correction Mode)
      </Typography>

      <Grid container>
        <Grid item xs="3">
          PROBLEM_SELECTOR
        </Grid>
        <Grid item xs="6">
          <Typography variant="h5" component="h2">
            Q: {problem.statement}
          </Typography>
        </Grid>
        <Grid item xs="3">
          STUDENT_SELECTOR
        </Grid>
      </Grid>

      <CorrectionModule
        assignmentID={assignmentID}
        problemID={problem.problemID}
        studentID={studentList[studentIndex]}
        keywords={problem.keywords}
      ></CorrectionModule>
    </Container>
  );
};

export default Correction;
