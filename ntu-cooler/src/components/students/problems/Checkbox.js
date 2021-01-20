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
                  checked={
                    // answer.find((e) => e === `option_${index}`) !== undefined
                    answer.includes(option)
                  }
                  onChange={(event) => {
                    // setAnswer((prev) =>
                    //   prev
                    //     .filter((e) => e !== event.target.name)
                    //     .concat(event.target.checked ? [event.target.name] : [])
                    //     .sort()
                    // );
                    setAnswer((prev) =>
                      prev.includes(option)
                        ? prev.filter((op) => option !== op).sort()
                        : [...prev, option].sort()
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
