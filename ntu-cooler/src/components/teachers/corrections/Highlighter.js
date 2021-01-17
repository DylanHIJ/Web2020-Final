import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { findAllChunks } from "./highlight_utils";

const Marker = ({ text, color }) => (
  <mark style={{ backgroundColor: color }}>{text}</mark>
);

const Highlighter = (props) => {
  const { text, keywords } = props;

  const chunks = findAllChunks({
    text,
    keywords,
  });
  console.log(chunks);

  const displayText = chunks.map((chunk) => {
    const { start, end, highlight, color } = chunk;
    const piece = text.substr(start, end - start);
    return highlight ? <Marker text={piece} color={color} /> : piece;
  });

  return (
    <Grid container>
      <Grid item xs="8">
        <Card variant="outlined" style={{ marginTop: "20px" }}>
          <CardContent>
            <Typography>{displayText}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs="4">
        OTHER COMPONENTS HERE
      </Grid>
    </Grid>
  );
};

export default Highlighter;
