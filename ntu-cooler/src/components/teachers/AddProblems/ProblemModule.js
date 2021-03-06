import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import TrueFalseModule from "./TrueFalseModule";
import MultipleChoiceModule from "./MultipleChoiceModule";
import CheckboxModule from "./CheckboxModule";
import KeywordModule from "./KeywordModule";

const ProblemModule = (props) => {
  const { problemIndex, initProblem, updateProblem } = props;
  const [problem, setProblem] = useState(initProblem);

  const updateAnswer = (newAnswer) => {
    const wrappedNewAnswer = Array.isArray(newAnswer) ? newAnswer : [newAnswer];
    console.log("Updating answer ->", wrappedNewAnswer);
    setProblem((prev) => ({
      ...prev,
      answers: wrappedNewAnswer,
    }));
  };
  const updateOptions = (newOptions) => {
    console.log("Updating options -> ", newOptions);
    setProblem((prev) => ({ ...prev, options: newOptions }));
  };

  const updateKeywords = (newKeywords) => {
    console.log("Updating newKeywords -> ", newKeywords);
    setProblem((prev) => ({ ...prev, keywords: newKeywords }));
  };

  useEffect(() => {
    updateProblem(problem);
  }, [problem]);

  return (
    <Card variant="outlined" style={{ marginTop: "12px" }}>
      <CardContent>
        <Grid container spacing={4} style={{ marginBottom: "12px" }}>
          <Grid item xs={7}>
            <TextField
              id="problem-statement"
              label="Problem Statement"
              placeholder=""
              variant="outlined"
              value={problem.statement}
              fullWidth
              multiline
              onChange={(event) => {
                setProblem((prev) => ({
                  ...prev,
                  statement: event.target.value,
                }));
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="problem-point"
              label="Problem Point"
              placeholder=""
              variant="outlined"
              value={problem.point}
              fullWidth
              onChange={(event) => {
                setProblem((prev) => ({
                  ...prev,
                  point: event.target.value,
                }));
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Problem Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={problem.type}
                onChange={(event) =>
                  setProblem((prev) => ({
                    ...prev,
                    type: event.target.value,
                  }))
                }
                label="problem-type"
              >
                <MenuItem value="TF">True/False</MenuItem>
                <MenuItem value="MULTIPLE_CHOICE">Multiple Choice</MenuItem>
                <MenuItem value="CHECKBOX">Checkbox</MenuItem>
                <MenuItem value="SHORT_QA">Short Answer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Container maxWidth="lg" style={{ textAlign: "center" }}>
          {problem.type === "TF" ? (
            <TrueFalseModule
              initAnswer={problem.answers[0]}
              updateAnswer={updateAnswer}
            />
          ) : problem.type === "MULTIPLE_CHOICE" ? (
            <MultipleChoiceModule
              problemIndex={problemIndex}
              initAnswer={problem.answers[0]}
              updateAnswer={updateAnswer}
              initOptions={problem.options}
              updateOptions={updateOptions}
            />
          ) : problem.type === "CHECKBOX" ? (
            <CheckboxModule
              problemIndex={problemIndex}
              initAnswer={problem.answers}
              updateAnswer={updateAnswer}
              initOptions={problem.options}
              updateOptions={updateOptions}
            />
          ) : problem.type === "SHORT_QA" ? (
            <KeywordModule
              problemIndex={problemIndex}
              initKeywords={problem.keywords}
              updateKeywords={updateKeywords}
            />
          ) : null}
        </Container>
      </CardContent>
    </Card>
  );
};

export default ProblemModule;
