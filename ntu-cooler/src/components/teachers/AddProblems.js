import React from "react";
import { Container, Typography, Divider } from "@material-ui/core";
import MetadataEditor from "./AddProblems/MetadataEditor";
import ProblemEditor from "./AddProblems/ProblemEditor";

const AddProblem = (props) => {
  const { assignmentID } = props;

  // const classes = useStyles();

  // const assignment = getAssignment(assignmentID);
  // const students = getStudentList(assignmentID).sort((a, b) =>
  //   a.studentID <= b.studentID ? -1 : 1
  // );

  return (
    <Container maxWidth="lg" style={{ marginTop: "6%" }}>
      {/* <Typography variant="h4" component="h2">
        New Assignment
      </Typography> */}

      {/* Metadata Editor */}
      <MetadataEditor />

      {/* Problem Detail Editor */}
      <ProblemEditor />
    </Container>
  );
};

export default AddProblem;
