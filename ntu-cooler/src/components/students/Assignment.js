import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button, Typography, Container, Grid } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import ProblemProgress from "./ProblemProgressBar";
import Problem from "./problems";
import { GET_ASSIGNMENT } from "../../graphql/queries";

const Assignment = (props) => {
  const { aid } = useParams();

  const { loading, data } = useQuery(GET_ASSIGNMENT, {
    variables: { aid: aid },
  });

  // TODO: get answers from server
  // const { answersLoading, answersData } = useQuery(GET_ANSWER, {
  //   variables: { email: , AID: aid };
  // })

  const assignment = loading ? {} : data.assignment;
  const problemIDs = loading ? [] : assignment.problems;

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const [answers, setAnswers] = useState({});

  // TODO: submit answer to server
  const submitAnswer = () => {
    console.log(answers);
  };

  // Set proper initial values for answers
  useEffect(() => {
    console.log("Retrieved assignment from server -> ", assignment);
    setAnswers((prev) =>
      problemIDs.reduce(
        (o, pid) => ({
          ...o,
          [pid]: prev[pid] === undefined ? [] : prev[o],
        }),
        {}
      )
    );
  }, [loading]);

  // Watch answers changes
  useEffect(() => {
    console.log("Answers updated ->", answers);
  }, [answers]);

  const updateAnswer = (problemID, newAnswer) => {
    console.log(`Updating answer of problem [${problemID}] -> `, newAnswer);
    setAnswers((prev) => ({
      ...prev,
      [problemID]: Array.isArray(newAnswer) ? newAnswer : [newAnswer],
    }));
  };

  if (loading) return null;

  if (problemIDs.length === 0) return "No problems available";

  return (
    <Container maxWidth="lg">
      {/* Assignment Name */}
      <Typography
        variant="h4"
        component="h2"
        style={{ marginTop: "6%", marginBottom: "2%" }}
      >
        {assignment.info.name}
      </Typography>

      {/* Progress Bar */}
      <ProblemProgress
        currentProblemIndex={currentProblemIndex}
        totalNumProblems={problemIDs.length}
      />

      {/* Problem content */}
      <Problem
        key={`problem_${problemIDs[currentProblemIndex]}`}
        pid={problemIDs[currentProblemIndex]}
        initAnswer={answers[problemIDs[currentProblemIndex]]}
        updateAnswer={(newAnswer) => {
          updateAnswer(problemIDs[currentProblemIndex], newAnswer);
        }}
      ></Problem>

      {/* Prev / Next */}
      <Grid container justify="space-between" style={{ marginTop: "3%" }}>
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
