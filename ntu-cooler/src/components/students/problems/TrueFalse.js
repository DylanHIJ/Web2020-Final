import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const TrueFalse = (props) => {
  const { problem, answer, setAnswer } = props;

  return (
    <form>
      <FormControl component="fieldset">
        <FormHelperText>True/False</FormHelperText>
        <RadioGroup
          aria-label={`assignment-${problem._id}`}
          name={`assignment-${problem._id}`}
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
        >
          <FormControlLabel value="True" control={<Radio />} label="True" />
          <FormControlLabel value="False" control={<Radio />} label="False" />
        </RadioGroup>
      </FormControl>
    </form>
  );
};

export default TrueFalse;
