import React, { useState } from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
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
  root: {
    display: "flex",
  },
  navlink: {
    color: "inherit",
    textDecoration: "none",
  },
  problem: {
    marginLeft: "3%",
    marginBottom: "3%",
    width: "100%",
  },
  container: {
    width: "100%",
  },
  leftButton: {
    float: "left",
    marginLeft: "10px",
  },
  rightButton: {
    float: "right",
    marginRight: "10px",
  },
}));

const Assignment = (assignement_id) => {
  const classes = useStyles();
  const assignment = getAssignment(assignement_id);

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const submitAnswer = () => {
    console.log("<3");
  };

  return (
    <div>
      {/* Assignment Name */}
      <Typography variant="h4" component="h2" className={classes.title}>
        {assignment.name}
      </Typography>

      {/* Progress Bar (TODO) */}
      <ProblemProgress
        currentProblemIndex={currentProblemIndex}
        totalNumProblems={assignment.problems.length}
      />

      {/* Problem content (TODO) */}
      <div className={classes.problem}>
        <Problem
          problem={assignment.problems[currentProblemIndex]}
          updateFunc={(pid, ans) => {
            setAnswers((prev) => {
              console.log(`prev: ${prev} | updating (${pid}: ${ans})`);
              prev[pid] = ans;
              return prev;
            }, console.log(answers));
          }}
        ></Problem>
      </div>

      {/* Prev / Next */}
      <div className={classes.container}>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentProblemIndex(currentProblemIndex - 1);
          }}
          className={classes.leftButton}
          disabled={currentProblemIndex === 0}
        >
          <ArrowBackIosIcon />
          Previous One
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (currentProblemIndex === assignment.problems.length - 1) {
              submitAnswer();
            } else {
              setCurrentProblemIndex(currentProblemIndex + 1);
            }
          }}
          className={classes.rightButton}
        >
          {currentProblemIndex === assignment.problems.length - 1
            ? "Submit"
            : "Next One"}
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
};

export default Assignment;
