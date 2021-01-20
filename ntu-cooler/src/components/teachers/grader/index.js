import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";

import Selector from "./Selector";
import Highlighter from "./Highlighter";
import ControlPanel from "./ControlPanel";
import { getStudentResponse } from "../utils";
import { useMutation } from "@apollo/client";
import { UPDATE_GRADE } from "../../../graphql/mutations";

const Grader = (props) => {
  const { assignmentID, problems, students } = props;

  const [studentID, setStudentID] = useState(students[0]);
  const [problemID, setProblemID] = useState(problems[0]._id);

  const [problem, setProblem] = useState(problems[0]);

  // Each instance is an object that has two properties, "score" and "comments"
  const [scores, setScores] = useState(
    students.reduce(
      (o, s) => ({ ...o, [s]: { score: undefined, comment: "" } }),
      {}
    )
  );

  const [updateGrade] = useMutation(UPDATE_GRADE);

  const updateGradeOnChanges = async () => {
    if (scores[studentID].score !== undefined) {
      const result = await updateGrade({
        variables: {
          email: studentID,
          pid: problemID,
          score: scores[studentID].score,
        },
      });
    }
  };

  useEffect(() => {
    updateGradeOnChanges();
    setProblem(problems.find((ele) => ele._id === problemID));
  }, [problemID]);

  useEffect(() => {
    updateGradeOnChanges();
  }, [studentID]);

  return (
    <Container maxWidth="lg">
      {/* Problem-related */}
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={9}>
          <Typography variant="h5" component="h2">
            Q: {problem.statement}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Selector
            name="Problems"
            value={problemID}
            updateFunc={(value) => {
              setProblemID(value);
            }}
            options={problems.map((ele) => ({
              ID: ele._id,
              description: `Prob. ${ele.index}`,
            }))}
            style={{ width: "80%" }}
          />
        </Grid>
      </Grid>

      {/* Student Related */}
      <Grid container style={{ marginTop: "20px" }} spacing={3}>
        <Grid item xs={8}>
          <Highlighter
            text="Hello"
            // text={studentResponse.text}
            keywords={problem.keywords}
          />
        </Grid>
        <Grid item xs={4}>
          <ControlPanel
            students={students}
            studentID={studentID}
            setStudentID={setStudentID}
            scores={scores}
            setScores={setScores}
            problemID={problem._id}
            maxScore={problem.point}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Grader;
