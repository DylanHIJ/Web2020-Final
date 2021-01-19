import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  Container,
  IconButton,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Keyword from "./Keyword";

const KeywordModule = (props) => {
  const { problemID, initKeywords, updateKeywords } = props;

  const defaultColorSet = [
    "#ABCDEF",
    "#ABEFCD",
    "#CDABEF",
    "#CDEFAB",
    "#EFABCD",
    "#EFCDAB",
    "#ABABAB",
  ];

  // If the initAnswer is neither "True" nor "False", set to "False" by default
  const [keywords, setKeywords] = useState(initKeywords);

  useEffect(() => {
    updateKeywords(keywords);
  }, [keywords]);
  const updateKeyword = (index, newKeyword) => {
    setKeywords((prev) =>
      prev.map((oldKeyword, i) => (i === index ? newKeyword : oldKeyword))
    );
  };

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormHelperText>Click + to add new keywords</FormHelperText>
        <Grid container>
          {keywords.map((keyword, index) => (
            <Grid item xs={keywords.length === 1 ? 12 : 6}>
              <Keyword
                keywordIndex={index}
                initKeyword={keyword}
                updateKeyword={updateKeyword}
              />
            </Grid>
          ))}
        </Grid>
      </FormControl>

      <Container>
        <IconButton
          onClick={() => {
            setKeywords((prev) => [
              ...prev,
              {
                word: "",
                color: defaultColorSet[prev.length % defaultColorSet.length],
              },
            ]);
          }}
        >
          <AddIcon />
        </IconButton>
      </Container>
    </React.Fragment>
  );
};

export default KeywordModule;
