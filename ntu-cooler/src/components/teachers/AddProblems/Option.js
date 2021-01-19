import React, { useEffect, useState } from "react";
import { FormControlLabel, TextField } from "@material-ui/core";

const Option = (props) => {
  const { optionIndex, initOption, updateOption, control } = props;

  const [option, setOption] = useState(initOption);

  useEffect(() => {
    updateOption(optionIndex, option);
  }, [option]);

  return (
    <FormControlLabel
      value={`option_${optionIndex}`}
      control={control}
      label={
        <TextField
          label={`Option ${optionIndex + 1}`}
          placeholder=""
          variant="outlined"
          value={option}
          fullWidth
          onChange={(event) => {
            setOption(event.target.value);
          }}
          margin="dense"
          error={option === ""}
        />
      }
    />
  );
};

export default Option;
