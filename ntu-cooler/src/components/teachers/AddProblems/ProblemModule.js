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
    console.log("Updating answer ->", newAnswer);
    setProblem((prev) => ({ ...prev, answer: newAnswer }));
  };
  const updateOptions = (newOptions) => {
    console.log("Updating options -> ", newOptions);
    setProblem((prev) => ({ ...prev, options: newOptions }));
  };

  const updateKeywords = (newKeywords) => {
    console.log("Updating newKeywords -> ", newKeywords);
    setProblem((prev) => ({ ...prev, options: newKeywords }));
  };

  useEffect(() => {
    updateProblem(problem);
  }, [problem]);

  return (
    <Card variant="outlined" style={{ marginTop: "12px" }}>
      <CardContent>
        <Grid container spacing={4} style={{ marginBottom: "12px" }}>
          <Grid item xs={9}>
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
          {
            problem.type === "TF" ? (
              <TrueFalseModule
                initAnswer={problem.answer}
                updateAnswer={updateAnswer}
              />
            ) : problem.type === "MULTIPLE_CHOICE" ? (
              <MultipleChoiceModule
                problemIndex={problemIndex}
                initAnswer={problem.answer}
                updateAnswer={updateAnswer}
                initOptions={problem.options}
                updateOptions={updateOptions}
              />
            ) : problem.type === "CHECKBOX" ? (
              <CheckboxModule
                problemIndex={problemIndex}
                initAnswer={problem.answer}
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
            ) : null //
          }
        </Container>
      </CardContent>
    </Card>
  );
};

export default ProblemModule;
