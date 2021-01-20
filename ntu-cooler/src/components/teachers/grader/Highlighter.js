import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { findAllChunks } from "./HighlightUtils";

const Marker = ({ text, color }) => (
  <mark style={{ backgroundColor: color }}>{text}</mark>
);

const Highlighter = (props) => {
  const { text, keywords } = props;

  const chunks = findAllChunks({
    text,
    keywords,
  });

  const displayText = chunks.map((chunk, index) => {
    const { start, end, highlight, color } = chunk;
    const piece = text.substr(start, end - start);
    return highlight ? (
      <Marker key={`chunk_${index}`} text={piece} color={color} />
    ) : (
      piece
    );
  });

  return (
    <Card variant="outlined" style={{ minHeight: "360px" }}>
      <CardContent>
        <Typography>{displayText}</Typography>
      </CardContent>
    </Card>
  );
};

export default Highlighter;
