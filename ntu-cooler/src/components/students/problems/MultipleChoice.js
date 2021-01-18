import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const MultipleChoice = (props) => {
  const { problem, answers, setAnswers } = props;
  const choices = problem.options.map((element) => (
    <FormControlLabel
      key={problem.problemID + "_" + element}
      value={element}
      label={element}
      control={<Radio />}
    />
  ));

  return (
    <form>
      <FormControl component="fieldset">
        <FormHelperText>Multiple Choice</FormHelperText>
        <RadioGroup
          aria-label={`assignment-${problem.problemID}`}
          name={`assignment-${problem.problemID}`}
          value={answers[problem.problemID]}
          onChange={(event) => {
            setAnswers((prev) => ({
              ...prev,
              [problem.problemID]: event.target.value,
            }));
          }}
        >
          {choices}
        </RadioGroup>
      </FormControl>
    </form>
  );
};

export default MultipleChoice;
