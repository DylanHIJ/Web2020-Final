import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Container, Typography } from "@material-ui/core";
import TrueFalse from "./TrueFalse";
import MultipleChoice from "./MultipleChoice";
import CheckboxProblem from "./Checkbox";
import ShortQA from "./ShortQA";
import { GET_STUDENT_PROBLEM } from "../../../graphql/queries";

import { getProblem } from "../utils";

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
  const { pid, initialAnswer, updateAnswer } = props;

  // const { loading, data } = useQuery(GET_STUDENT_PROBLEM, {
  //   variables: { pid: pid },
  // });

  // const problem = loading ? {} : data.problem;

  // console.log(problem);

  // if (loading) return <p>Loading</p>;

  const problem = getProblem(pid);

  const [answer, setAnswer] = useState(
    initialAnswer !== undefined
      ? initialAnswer
      : generateInitialAnswer(problem.type)
  );
  // initialAnswer === null ? genrateInitialAnswer(problem.type) : initialAnswer

  useEffect(() => {
    updateAnswer(answer);
  }, [answer]);

  return (
    <Container fullWidth style={{ marginTop: 24 }}>
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
