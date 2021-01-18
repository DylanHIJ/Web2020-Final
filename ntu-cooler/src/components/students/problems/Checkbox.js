import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
} from "@material-ui/core";

const CheckboxProblem = (props) => {
  const { problem, answers, setAnswers } = props;

  const choices = problem.options.map((element) => (
    <FormControlLabel
      key={problem.PID + "_" + element}
      value={element}
      control={<Checkbox />}
      label={element}
    />
  ));

  return (
    <form>
      <FormControl component="fieldset">
        <FormHelperText>Select all that apply.</FormHelperText>
        <FormGroup
          aria-label={`assignment-${problem._id}`}
          name={`assignment-${problem._id}`}
          value={answers[problem._id]}
          onChange={(event) => {
            setAnswers((prev) => ({
              ...prev,
              [problem._id]: event.target.value,
            }));
          }}
        >
          {choices}
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default CheckboxProblem;
