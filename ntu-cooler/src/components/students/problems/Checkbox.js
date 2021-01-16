import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
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

const CheckboxProblem = (props) => {
  const { problem, updateFunc } = props;
  const classes = useStyles();

  const [value, setValue] = useState([]);

  const handleSubmit = () => {};
  const handleRadioChange = (event) => {
    setValue(
      (prev) =>
        event.target.checked
          ? prev.concat([event.target.value])
          : prev.filter((ele) => ele !== event.target.value),
      () => {
        updateFunc(problem.pid, value);
      }
    );
  };

  const choices = problem.options.map((element) => (
    <FormControlLabel
      key={problem.PID + "_" + element}
      value={element}
      control={<Checkbox />}
      label={element}
    />
  ));

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{problem.statement}</FormLabel>
        <FormHelperText>Select all that apply.</FormHelperText>
        <FormGroup
          aria-label="quiz"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {choices}
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default CheckboxProblem;
