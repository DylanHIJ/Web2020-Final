import React, { useState, useEffect } from "react";
import {
  Container,
  GridList,
  GridListTile,
  TextField,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const OptionModule = (props) => {
  const { problemIndex, initOptions, updateOptions } = props;

  while (initOptions.length < 4) {
    initOptions.push("");
  }

  const [options, setOptions] = useState(initOptions);

  useEffect(() => {
    updateOptions(options);
  }, [options]);

  return (
    <Container maxWidth="lg" style={{ textAlign: "center" }}>
      <GridList cellHeight="auto" cols={2} spacing={8}>
        {options.map((option, index) => (
          <GridListTile key={`problem${problemIndex}-${index}`}>
            <TextField
              id={`problem${problemIndex}-${index}`}
              label={`Option ${index + 1}`}
              placeholder=""
              variant="outlined"
              value={option}
              fullWidth
              onChange={(event) => {
                setOptions((prev) => {
                  prev[index] = event.target.value;
                  return prev;
                });
              }}
              style={{
                marginTop: "6px",
                marginBottom: "6px",
              }}
            />
          </GridListTile>
        ))}
      </GridList>

      <IconButton
        onClick={() => {
          setOptions((prev) => [...prev, ""]);
        }}
      >
        <AddIcon />
      </IconButton>
    </Container>
  );
};

export default OptionModule;
