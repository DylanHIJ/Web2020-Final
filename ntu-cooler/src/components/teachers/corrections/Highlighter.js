import React, { useRef, useEffect } from "react";
import Mark from "mark.js";

const Highlighter = (props) => {
  const { text, keywords } = props;
  const ref = useRef(null);

  // useEffect(() => {
  //   const instance = Mark(ref.current);
  //   keywords.forEach((ele) => {
  //     instance.mark(ele.word);
  //   });
  // });

  return (
    <div ref={ref}>
      <p>{text}</p>
    </div>
  );
};

export default Highlighter;
