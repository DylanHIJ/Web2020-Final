import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
} from "@material-ui/core";

const CheckboxProblem = (props) => {
  const { problem, answer, setAnswer } = props;

  return (
    <form>
      <FormControl component="fieldset">
        <FormHelperText>Select all that apply.</FormHelperText>
        <FormGroup
          aria-label={`assignment-${problem._id}`}
          name={`assignment-${problem._id}`}
        >
          {problem.options.map((option, index) => (
            <FormControlLabel
              key={`problem_${problem._id}-option_${index}`}
              control={
                <Checkbox
                  name={`option_${index}`}
                  checked={answer.includes(`option_${index}`)}
                  onChange={(event) => {
                    setAnswer((prev) =>
                      prev.includes(`option_${index}`)
                        ? prev.filter((op) => `option_${index}` !== op).sort()
                        : [...prev, `option_${index}`].sort()
                    );
                  }}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default CheckboxProblem;
