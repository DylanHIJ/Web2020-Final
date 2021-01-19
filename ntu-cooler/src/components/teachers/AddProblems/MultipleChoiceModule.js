import React, { useEffect, useState } from "react";
import {
  FormControl,
  RadioGroup,
  Radio,
  Container,
  IconButton,
  FormHelperText,
  Grid,
} from "@material-ui/core";

import Option from "./Option";
import AddIcon from "@material-ui/icons/Add";

const MultipleChoiceModule = (props) => {
  const {
    problemIndex,
    initOptions,
    updateOptions,
    initAnswer,
    updateAnswer,
  } = props;

  const [options, setOptions] = useState(
    Array.isArray(initOptions) && initOptions.length > 0
      ? initOptions
      : ["", "", "", ""]
  );

  const [answer, setAnswer] = useState(initAnswer);

  useEffect(() => {
    updateOptions(options);
  }, [options]);

  useEffect(() => {
    updateAnswer(answer);
  }, [answer]);

  const updateOption = (index, newOption) => {
    console.log(`Updating option on ${index} to ${newOption}`);
    setOptions((prev) => prev.map((e, i) => (i === index ? newOption : e)));
  };

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormHelperText>Click + to add new options</FormHelperText>
        <RadioGroup
          name={`problem_${problemIndex}`}
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
        >
          <Grid container>
            {options.map((option, index) => (
              <Grid item xs={4}>
                <Option
                  key={`problem_${problemIndex}-option_${index}`}
                  optionIndex={index}
                  initOption={option}
                  updateOption={updateOption}
                  control={<Radio />}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>

      <Container>
        <IconButton
          onClick={() => {
            setOptions((prev) => [...prev, ""]);
          }}
        >
          <AddIcon />
        </IconButton>
      </Container>
    </React.Fragment>
  );
};

export default MultipleChoiceModule;
