import React, { useEffect, useState } from "react";
import { TextField, Grid } from "@material-ui/core";
import { GithubPicker } from "react-color";

const Keyword = (props) => {
  const { keywordIndex, initKeyword, updateKeyword } = props;

  const [keyword, setKeyword] = useState(initKeyword);
  const defaultColorSet = [
    "#ABCDEF",
    "#ABEFCD",
    "#CDABEF",
    "#CDEFAB",
    "#EFABCD",
    "#EFCDAB",
    "#ABABAB",
  ];

  useEffect(() => {
    updateKeyword(keywordIndex, keyword);
  }, [keyword]);

  return (
    <Grid container spacing={2} style={{ marginTop: "6px" }}>
      <Grid item xs={4}>
        <TextField
          // label={`Keyword ${keyword + 1}`}
          placeholder="The keyword"
          variant="outlined"
          margin="dense"
          value={keyword.word}
          fullWidth
          onChange={(event) => {
            setKeyword((prev) => ({ ...prev, word: event.target.value }));
          }}
          style={{
            margin: 0,
            backgroundColor: keyword.color,
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <GithubPicker
          triangle="hide"
          colors={defaultColorSet}
          color={keyword.color}
          onChange={(color) =>
            setKeyword((prev) => ({ ...prev, color: color }))
          }
        />
      </Grid>
    </Grid>
  );
};

export default Keyword;
