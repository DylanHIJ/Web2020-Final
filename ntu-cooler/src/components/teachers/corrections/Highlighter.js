import React from "react";
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

  return <div>{displayText}</div>;
};

export default Highlighter;
