import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
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
import { GET_ASSIGNMENT_FOR_STUDENT_ANSWERING } from "../../graphql/queries";
import { getAssignment } from "./utils.js";

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

const Assignment = (props) => {
  const classes = useStyles();
  const { aid } = useParams();

  // const { loading, data } = useQuery(GET_ASSIGNMENT_FOR_STUDENT_ANSWERING, {
  //   variables: { aid: aid },
  // });

  const assignment = getAssignment(aid);
  const problemIDs = assignment.problems;

  // const assignment = loading ? {} : data.assignment;
  // const problemIDs = loading ? [] : assignment.problems;

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  // TODO: need to get answers from server
  const [answers, setAnswers] = useState({});

  const submitAnswer = () => {
    console.log(answers);
  };

  const updateAnswer = (problemID, newAnswer) => {
    console.log(`Updating answer of problem [${problemID}] -> `, newAnswer);
    setAnswers((prev) => ({ ...prev, [problemID]: newAnswer }));
  };

  // if (loading) return <p>Loading</p>;

  return (
    <Container maxWidth="lg">
      {/* Assignment Name */}
      <Typography variant="h4" component="h2" className={classes.title}>
        {assignment.name}
      </Typography>

      {/* Progress Bar */}
      <ProblemProgress
        currentProblemIndex={currentProblemIndex}
        totalNumProblems={problemIDs.length}
      />

      {/* Problem content */}
      <div className={classes.problem}>
        <Problem
          key={`problem_${problemIDs[currentProblemIndex]}`}
          pid={problemIDs[currentProblemIndex]}
          initAnswer={answers[problemIDs[currentProblemIndex]]}
          updateAnswer={(newAnswer) => {
            updateAnswer(problemIDs[currentProblemIndex], newAnswer);
          }}
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
