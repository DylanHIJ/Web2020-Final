import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const Selector = (props) => {
  const { value, updateFunc, options, name, style } = props;

  const handleChange = (event) => {
    updateFunc(event.target.value);
  };

  return (
    <FormControl variant="outlined" style={style}>
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
