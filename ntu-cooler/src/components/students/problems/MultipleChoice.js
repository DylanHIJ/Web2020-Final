import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Typography,
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
  const { problem, updateFunc } = props;
  const classes = useStyles();

  const [value, setValue] = useState(null);

  const handleSubmit = () => {};
  const handleChange = (event) => {
    setValue(event.target.value);
    updateFunc(problem.pid, event.target.value);
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
        <Typography variant="h5" component="h4">
          {problem.statement}
        </Typography>
        <FormHelperText>Multiple Choice</FormHelperText>
        <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={value}
          onChange={handleChange}
        >
          {choices}
        </RadioGroup>
      </FormControl>
    </form>
  );
};

export default MultipleChoice;
