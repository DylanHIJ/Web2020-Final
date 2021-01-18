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
      key={problem._id + "_" + element}
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
        </RadioGroup>
      </FormControl>
    </form>
  );
};

export default MultipleChoice;
