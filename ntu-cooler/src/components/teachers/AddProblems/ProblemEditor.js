import React from "react";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ProblemModule from "./ProblemModule";
import GENERATE_PROBLEM_TEMPLATE from "../../../templates/problem";

const ProblemEditor = (props) => {
  const { problems, setProblems } = props;

  return (
    <Container maxWidth="md">
      <Card variant="outlined" style={{ marginTop: "30px" }}>
        <CardContent>
          {problems.map((ele, index) => (
            <React.Fragment>
              <ProblemModule
                key={`problem${index}`}
                problemIndex={index}
                initProblem={ele}
                updateProblem={(newProblem) => {
                  setProblems((prev) => {
                    prev[index] = newProblem;
                    return prev;
                  });
                }}
              />
            </React.Fragment>
          ))}
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <IconButton
            onClick={() => {
              setProblems((prev) => [...prev, GENERATE_PROBLEM_TEMPLATE()]);
            }}
          >
            <AddIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ProblemEditor;
