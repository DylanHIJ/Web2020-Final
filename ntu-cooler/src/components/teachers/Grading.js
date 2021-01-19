import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import Grader from "./grader";
import { getAssignment, getProblems, getStudentList } from "./utils";

const Grading = (props) => {
  const { aid } = useParams();

  const assignment = getAssignment(aid);
  const students = getStudentList(aid).sort((a, b) =>
    a.studentID <= b.studentID ? -1 : 1
  );
  const problems = getProblems(aid).sort((a, b) => a.index - b.index);

  return (
    <Container maxWidth="lg" style={{ marginTop: "6%" }}>
      {/* Assignment Name */}
      <Typography variant="h4" component="h2" style={{ marginBottom: "3%" }}>
        {assignment.name} (Grader Mode)
      </Typography>

      <Grader assignmentID={aid} problems={problems} students={students} />
    </Container>
  );
};

export default Grading;
