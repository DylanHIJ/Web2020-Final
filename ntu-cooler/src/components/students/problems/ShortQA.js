import React from "react";
import { FormControl, FormHelperText, TextField } from "@material-ui/core";

const ShortQA = (props) => {
  const { problem, answers, setAnswers } = props;

  return (
    <form>
      <FormControl component="fieldset" style={{ width: "90%" }}>
        <FormHelperText>Short answer problem</FormHelperText>
        <TextField
          name={`assignment-${problem.problemID}`}
          // label="Input here"
          variant="outlined"
          multiline
          style={{
            marginTop: 24,
          }}
          rows={6}
          value={answers[problem.problemID]}
          onChange={(event) => {
            setAnswers((prev) => ({
              ...prev,
              [problem.problemID]: event.target.value,
            }));
          }}
        />
      </FormControl>
    </form>
  );
};

export default ShortQA;
