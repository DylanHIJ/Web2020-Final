import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const KeywordModule = (props) => {
  const { problemID, initKeywords, updateKeywords } = props;

  // If the initAnswer is neither "True" nor "False", set to "False" by default
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    updateKeywords(keywords);
  }, [keywords]);

  return null;
};

export default KeywordModule;
