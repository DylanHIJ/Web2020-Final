import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Container, Typography } from "@material-ui/core";
import { GET_ASSIGNMENT, GET_SHORT_QA_PROBLEMS } from "../../graphql/queries";
// import { getAssignment, getProblems, getStudentList } from "./utils";

import Grader from "./grader";
import Loading from "../Loading";

const Grading = (props) => {
  const { aid } = useParams();

  const [assignmentInfo, setAssignmentInfo] = useState({});
  const [students, setStudents] = useState([]);
  const [problems, setProblems] = useState([]);

  const { loading: aLoading, data: aData } = useQuery(GET_ASSIGNMENT, {
    variables: { aid: aid },
  });

  const { loading, data } = useQuery(GET_SHORT_QA_PROBLEMS, {
    variables: { aid: aid },
  });

  useEffect(() => {
    if (!loading) {
      console.log("Retrieved shortQA problems from server -> ", data);
      setStudents(data.shortQAProblem.students.sort());
      setProblems(data.shortQAProblem.problems);
    }
  }, [loading, data]);

  useEffect(() => {
    if (!aLoading) {
      console.log("Retrieved assignment info from server -> ", aData);
      setAssignmentInfo(aData.assignment.info);
    }
  }, [aLoading, aData]);

  if (aLoading || loading) return <Loading />;

  return (
    <Container maxWidth="lg" style={{ marginTop: "6%" }}>
      {/* Assignment Name */}
      <Typography variant="h4" component="h2" style={{ marginBottom: "3%" }}>
        {assignmentInfo.name} (Grader Mode)
      </Typography>

      {students.length === 0 || problems.length === 0 ? (
        <Typography variant="h6" component="h2" style={{ marginBottom: "3%" }}>
          Congrats! There're either no shortQA problems or no students.
        </Typography>
      ) : (
        <Grader assignmentID={aid} problems={problems} students={students} />
      )}
    </Container>
  );
};

export default Grading;
