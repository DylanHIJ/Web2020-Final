import React, { useEffect, useRef } from "react";
import { FormControl, FormHelperText, TextField } from "@material-ui/core";

const ShortQA = (props) => {
  const { problem, answer, setAnswer } = props;

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <form>
      <FormControl component="fieldset" style={{ width: "90%" }}>
        <FormHelperText>Short answer problem</FormHelperText>
        <TextField
          inputRef={inputRef}
          name={`assignment-${problem._id}`}
          // label="Input here"
          variant="outlined"
          multiline
          style={{
            marginTop: 24,
          }}
          rows={6}
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
        />
      </FormControl>
    </form>
  );
};

export default ShortQA;
