import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const MultipleChoice = (props) => {
  const { problem } = props;
  const classes = useStyles();

  const [value, setValue] = useState(null);

  const handleSubmit = () => {};
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const choices = problem.options.map((element) => (
    <FormControlLabel
      key={problem.PID + "_" + element}
      value={element}
      control={<Radio />}
      label={element}
    />
  ));

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{problem.statement}</FormLabel>
        <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {choices}
        </RadioGroup>
        <FormHelperText>helper text tbd</FormHelperText>
      </FormControl>
    </form>
  );
};

export default MultipleChoice;
