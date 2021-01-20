import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";

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
    problems.reduce(
      (o, p) => ({
        ...o,
        [p._id]: students.reduce(
          (oo, s) => ({
            ...oo,
            [s]: { score: undefined, comment: "", graded: false },
          }),
          {}
        ),
      }),
      {}
    )
  );

  const [updateGrade] = useMutation(UPDATE_GRADE);

  const updateGradeOnChanges = async () => {
    problems.forEach(async (problem) => {
      students.forEach(async (student) => {
        if (scores[problem._id][student].graded) {
          console.log(
            student,
            typeof student,
            problem._id,
            scores[problem._id][student].score,
            scores[problem._id][student].comment
          );
          const result = await updateGrade({
            variables: {
              email: student,
              pid: problem._id,
              score: scores[problem._id][student].score,
              comment: scores[problem._id][student].comment,
            },
          });
        }
      });
    });
  };

  useEffect(() => {
    console.log("Scores updated to -> ", scores);
  }, [scores]);

  useEffect(() => {
    setProblem(problems.find((ele) => ele._id === problemID));
  }, [problemID]);

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

      {/* Button */}
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1%",
        }}
      >
        <Button
          onClick={async () => {
            updateGradeOnChanges();
          }}
          variant="outlined"
        >
          Save
        </Button>
      </Container>
    </Container>
  );
};

export default Grader;
