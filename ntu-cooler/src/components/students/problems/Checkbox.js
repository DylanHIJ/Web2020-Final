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
  const { problem } = props;
  const classes = useStyles();

  const [value, setValue] = useState([]);

  const handleSubmit = () => {};
  const handleRadioChange = (event) => {
    if (event.target.checked) {
      setValue((oldValue) => oldValue.concat([event.target.value]));
    } else {
      setValue((oldValue) =>
        oldValue.filter((ele) => ele !== event.target.value)
      );
    }
    setValue(event.target.value);
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
        <FormGroup
          aria-label="quiz"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {choices}
        </FormGroup>
        <FormHelperText>helper text tbd</FormHelperText>
      </FormControl>
    </form>
  );
};

export default CheckboxProblem;
