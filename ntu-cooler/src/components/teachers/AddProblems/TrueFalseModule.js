import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  FormHelperText,
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
        <Grid container justify="center">
          <Grid item xs={6}>
            <FormControlLabel value="True" control={<Radio />} label="True" />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel value="False" control={<Radio />} label="False" />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default TrueFalseModule;
