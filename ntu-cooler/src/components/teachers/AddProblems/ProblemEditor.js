import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ProblemModule from "./ProblemModule";
import GENERATE_PROBLEM_TEMPLATE from "../../../templates/problem";

const ProblemEditor = (props) => {
  const [problems, setProblems] = useState([]);

  return (
    <Container maxWidth="md">
      <Card variant="outlined" style={{ marginTop: "30px" }}>
        <CardContent>
          {problems.map((ele, idx) => (
            <React.Fragment>
              <ProblemModule
                problem={ele}
                updateProblem={(newProblem) => {
                  setProblems((prev) => {
                    prev[idx] = newProblem;
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
