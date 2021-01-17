import React, { useState } from "react";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";

import Selector from "./Selector";
import Highlighter from "./Highlighter";
import ControlPanel from "./ControlPanel";
import { getStudentResponse } from "../utils";

const Grader = (props) => {
  const { assignmentID, problems, students } = props;

  const [studentID, setStudentID] = useState(students[0].studentID);
  const [problemID, setProblemID] = useState(problems[0].problemID);
  const [problem, setProblem] = useState(problems[0]);

  const studentResponse = getStudentResponse(
    assignmentID,
    problemID,
    studentID
  );

  return (
    <Container maxWidth="lg">
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
              description: `${ele.name} (${ele.studentID})`,
            }))}
          />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: "20px" }} spacing="3">
        <Grid item xs="8">
          <Highlighter
            text={studentResponse.text}
            keywords={problem.keywords}
          ></Highlighter>
        </Grid>
        <Grid item xs="4">
          <ControlPanel />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Grader;
