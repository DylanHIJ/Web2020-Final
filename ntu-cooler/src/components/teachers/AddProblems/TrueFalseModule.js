import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const TrueFalseModule = (props) => {
  const { problemID, initAnswer, updateAnswer } = props;

  // If the initAnswer is neither "True" nor "False", set to "False" by default
  const [answer, setAnswer] = useState(
    initAnswer === "True" ? "True" : "False"
  );

  useEffect(() => {
    updateAnswer(answer);
  }, [answer]);

  return (
    <FormControl component="fieldset">
      <RadioGroup
        name={`problem_${problemID}`}
        value={answer}
        onChange={(event) => {
          setAnswer(event.target.value);
        }}
      >
        <FormControlLabel value="True" control={<Radio />} label="True" />
        <FormControlLabel value="False" control={<Radio />} label="False" />
      </RadioGroup>
    </FormControl>
  );
};

export default TrueFalseModule;
