import React, { useEffect, useRef } from "react";
import { FormControl, FormHelperText, TextField } from "@material-ui/core";

const ShortQA = (props) => {
  const { problem, answers, setAnswers } = props;

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
          value={answers[problem._id]}
          onChange={(event) => {
            setAnswers((prev) => ({
              ...prev,
              [problem._id]: event.target.value,
            }));
          }}
        />
      </FormControl>
    </form>
  );
};

export default ShortQA;
