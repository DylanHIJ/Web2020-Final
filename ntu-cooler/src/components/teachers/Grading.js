import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import Grader from "./grader";
import { getAssignment, getProblems, getStudentList } from "./utils";

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

const Grading = (props) => {
  const { assignmentID } = props;

  const classes = useStyles();

  const assignment = getAssignment(assignmentID);
  const students = getStudentList(assignmentID).sort((a, b) =>
    a.studentID <= b.studentID ? -1 : 1
  );
  const problems = getProblems(assignmentID).sort((a, b) => a.index - b.index);

  return (
    <Container maxWidth="lg">
      {/* Assignment Name */}
      <Typography variant="h4" component="h2" className={classes.title}>
        {assignment.name} (Grader Mode)
      </Typography>

      <Grader
        assignmentID={assignmentID}
        problems={problems}
        students={students}
      />
    </Container>
  );
};

export default Grading;
