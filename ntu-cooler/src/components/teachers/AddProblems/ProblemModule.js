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
import OptionModule from "./OptionModule";

const ProblemModule = (props) => {
  const { problemIndex, initProblem, updateProblem } = props;
  const [problem, setProblem] = useState(initProblem);

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
        {problem.type === "MULTIPLE_CHOICE" || problem.type === "CHECKBOX" ? (
          <OptionModule
            problemIndex={problemIndex}
            initOptions={problem.options}
            updateOptions={(newOptions) => {
              setProblem((prev) => ({ ...prev, options: newOptions }));
            }}
          />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ProblemModule;
