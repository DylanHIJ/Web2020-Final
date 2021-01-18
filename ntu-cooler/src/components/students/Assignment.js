import React, { useState } from "react";
import {
  Button,
  Typography,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ProblemProgress from "./ProblemProgressBar";
import Problem from "./problems";
import { getAssignment } from "./utils";

// answers is an object of
// PID -> {type: string, answer: varies}
// TF: bool ; MultipleChoice: int ; Checkbox: [int] ; Text: string
const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
  problem: {
    marginLeft: "3%",
    marginBottom: "3%",
    width: "100%",
  },
}));

const Assignment = (assignement_id) => {
  const classes = useStyles();
  const assignment = getAssignment(assignement_id);
  const problems = assignment.problems;

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [answers, setAnswers] = useState(
    problems.reduce((o, k) => ({ ...o, [k]: undefined }), {})
  );

  const submitAnswer = () => {
    console.log(answers);
  };

  return (
    <Container maxWidth="lg">
      {/* Assignment Name */}
      <Typography variant="h4" component="h2" className={classes.title}>
        {assignment.name}
      </Typography>

      {/* Progress Bar */}
      <ProblemProgress
        currentProblemIndex={currentProblemIndex}
        totalNumProblems={problems.length}
      />

      {/* Problem content */}
      <div className={classes.problem}>
        <Problem
          problem={problems[currentProblemIndex]}
          answers={answers}
          setAnswers={setAnswers}
        ></Problem>
      </div>

      {/* Prev / Next */}
      <Grid container justify="space-between">
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentProblemIndex((prev) => prev - 1);
            }}
            disabled={currentProblemIndex === 0}
          >
            <ArrowBackIosIcon />
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              if (currentProblemIndex === assignment.problems.length - 1) {
                submitAnswer();
              } else {
                setCurrentProblemIndex((prev) => prev + 1);
              }
            }}
          >
            {currentProblemIndex === assignment.problems.length - 1
              ? "Submit"
              : "Next"}
            <ArrowForwardIosIcon />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Assignment;
