import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const MultipleChoice = (props) => {
  const { problem, answer, setAnswer } = props;

  const choices = problem.options.map((element, index) => (
    <FormControlLabel
      key={problem._id + "_" + element}
      value={`option_${index}`}
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
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
        >
          {choices}
        </RadioGroup>
      </FormControl>
    </form>
  );
};

export default MultipleChoice;
