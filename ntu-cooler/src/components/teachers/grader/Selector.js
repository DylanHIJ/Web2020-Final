import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // minWidth: 120,
    width: "80%",
  },
}));

const Selector = (props) => {
  const { value, setValue, options, name } = props;

  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel htmlFor={name}></InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        inputProps={{
          name: { name },
          id: { name },
        }}
      >
        {options.map((ele) => (
          <MenuItem value={ele.ID}>{ele.description}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
