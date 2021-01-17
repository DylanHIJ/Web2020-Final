import React, { useState } from "react";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import CorrectionModule from "./corrections";
import { getAssignment, getProblems, getStudentList } from "./utils";
import Selector from "./selector";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
  center: {
    float: "center",
  },
}));

const Correction = (props) => {
  const { assignmentID } = props;

  const classes = useStyles();

  const assignment = getAssignment(assignmentID);
  const students = getStudentList(assignmentID);
  const problems = getProblems(assignmentID);

  const [studentID, setStudentID] = useState(students[0].studentID);
  const [problemID, setProblemID] = useState(problems[0].problemID);
  const [problem, setProblem] = useState(problems[0]);

  return (
    <Container maxWidth="lg">
      {/* Assignment Name */}
      <Typography variant="h4" component="h2" className={classes.title}>
        {assignment.name} (Correction Mode)
      </Typography>

      <Grid container>
        <Grid item xs="3">
          <Selector
            name="Problems"
            value={problemID}
            setValue={setProblemID}
            options={problems.map((ele) => ({
              ID: ele.problemID,
              description: `Prob. ${ele.index}`,
            }))}
            className={classes.center}
          />
        </Grid>
        <Grid item xs="6">
          <Typography variant="h5" component="h2">
            Q: {problem.statement}
          </Typography>
        </Grid>
        <Grid item xs="3">
          <Selector
            name="Students"
            value={studentID}
            setValue={setStudentID}
            options={students.map((ele) => ({
              ID: ele.studentID,
              description: `${ele.name} (${ele.problemID})`,
            }))}
          />
        </Grid>
      </Grid>

      <CorrectionModule
        assignmentID={assignmentID}
        problemID={problemID}
        studentID={studentID}
        keywords={problems.find((ele) => ele.problemID === problemID).keywords}
      ></CorrectionModule>
    </Container>
  );
};

export default Correction;
