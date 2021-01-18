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

const ProblemModule = (props) => {
  const { problem, updateProblem } = props;
  const [problemEditing, setProblemEditing] = useState(problem);

  useEffect(() => {
    console.log(problemEditing);
  }, [problemEditing]);

  return (
    <Card variant="outlined" style={{ marginTop: "12px" }}>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <TextField
              id="problem-statement"
              label="Problem Statement"
              placeholder=""
              variant="outlined"
              value={problemEditing.statement}
              fullWidth
              multiline
              onChange={(event) => {
                setProblemEditing((prev) => ({
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
                value={problemEditing.type}
                onChange={(event) =>
                  setProblemEditing((prev) => ({
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
      </CardContent>
    </Card>
  );
};

export default ProblemModule;
