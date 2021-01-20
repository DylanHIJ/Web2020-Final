import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormGroup,
  FormHelperText,
  Checkbox,
  Container,
  IconButton,
  Grid,
} from "@material-ui/core";

import Option from "./Option";
import AddIcon from "@material-ui/icons/Add";

const CheckboxModule = (props) => {
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

  const [answer, setAnswer] = useState(
    []
    //Array.isArray(initAnswer) ? initAnswer : []
    // Array.isArray(initAnswer) ? initAnswer.filter(): []
  );

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
        <FormGroup name={`problem_${problemIndex}`} value={answer}>
          <Grid container>
            {options.map((option, index) => (
              <Grid item xs={4}>
                <Option
                  key={`problem_${problemIndex}-option_${index}`}
                  control={
                    <Checkbox
                      name={`option_${index}`}
                      checked={answer.includes(`option_${index}`)}
                      onChange={(event) => {
                        setAnswer((prev) =>
                          prev
                            .filter((e) => e !== event.target.name)
                            .concat(
                              event.target.checked ? [event.target.name] : []
                            )
                            .sort()
                        );
                      }}
                    />
                  }
                  optionIndex={index}
                  initOption={option}
                  updateOption={updateOption}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
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

export default CheckboxModule;
