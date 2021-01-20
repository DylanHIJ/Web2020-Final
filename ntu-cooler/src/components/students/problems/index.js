import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Container, Typography } from "@material-ui/core";
import TrueFalse from "./TrueFalse";
import MultipleChoice from "./MultipleChoice";
import CheckboxProblem from "./Checkbox";
import ShortQA from "./ShortQA";
import { GET_STUDENT_PROBLEM } from "../../../graphql/queries";

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
  const { pid, initAnswer, updateAnswer } = props;

  const { loading, data } = useQuery(GET_STUDENT_PROBLEM, {
    variables: { pid: pid },
  });

  const problem = loading ? {} : data.problem;

  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    setAnswer(
      initAnswer !== undefined
        ? initAnswer
        : generateInitialAnswer(problem.type)
    );
  }, [loading]);

  useEffect(() => {
    updateAnswer(answer);
  }, [answer]);

  if (loading) return null;

  return (
    <Container maxWidth="md">
      <Typography variant="h5" component="h4" style={{ marginTop: "1%" }}>
        Q: {problem.statement}
      </Typography>
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
      ) : null}
    </Container>
  );
};

export default Problem;
