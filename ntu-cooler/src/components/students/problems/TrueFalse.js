import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
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

const TrueFalse = (props) => {
  const { problem, updateFunc } = props;
  const classes = useStyles();

  const [value, setValue] = useState(null);

  const handleSubmit = () => {};
  const handleChange = (event) => {
    updateFunc(problem.pid, event.target.value);
    setValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" className={classes.formControl}>
        <Typography variant="h5" component="h4">
          {problem.statement}
        </Typography>
        <FormHelperText>True/False</FormHelperText>
        <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="True" control={<Radio />} label="True" />
          <FormControlLabel value="False" control={<Radio />} label="False" />
        </RadioGroup>
      </FormControl>
    </form>
  );
};

export default TrueFalse;
