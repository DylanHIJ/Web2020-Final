import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import TrueFalse from "./TrueFalse";
import MultipleChoice from "./MultipleChoice";
import CheckboxProblem from "./Checkbox";
import ShortQA from "./ShortQA";

const generateInitialAnswer = (type) => {
  if (type === "TF" || type === "MULTIPLE_CHOICE") {
    return null;
  } else if (type === "CHECKBOX") {
    return [];
  } else if (type === "SHORT_QA") {
    return "";
  } else {
    return null;
  }
};

const Problem = (props) => {
  const { problem, initialAnswer, updateAnswer, rerender, setRerender } = props;
  const [answer, setAnswer] = useState(initialAnswer);

  useEffect(() => {
    updateAnswer(answer);
  }, [answer]);

  useEffect(() => {
    if (rerender) {
      setRerender(false);
      if (initialAnswer === null) {
        setAnswer(generateInitialAnswer(problem.type));
      }
    }
  }, [rerender]);

  return (
    <Container style={{ marginTop: 24, width: "100%" }}>
      <Typography variant="h5" component="h4">
        {problem.statement}
      </Typography>

      {/* Different problem */}
      {problem.type === "TF" ? (
        <TrueFalse problem={problem} answer={answer} setAnswer={setAnswer} />
      ) : problem.type === "MULTIPLE_CHOICE" ? (
        <MultipleChoice
          problem={problem}
          answer={answer}
          setAnswer={setAnswer}
        />
      ) : problem.type === "CHECKBOX" ? (
        <CheckboxProblem
          problem={problem}
          answer={answer}
          setAnswer={setAnswer}
        />
      ) : problem.type === "SHORT_QA" ? (
        <ShortQA problem={problem} answer={answer} setAnswer={setAnswer} />
      ) : (
        <p>ERROR</p>
      )}
    </Container>
  );
};

export default Problem;
