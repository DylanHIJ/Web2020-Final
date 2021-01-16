import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ProblemProgress from "./ProblemProgressBar";
import Problem from "./problems";
import { getAssignment } from "./utils";

// answers is an object of
// PID -> {type: string, answer: varies}
// TF: bool ; MultipleChoice: int ; Checkbox: [int] ; Text: string

const Assignment = (assignement_id) => {
  const assignment = getAssignment(assignement_id);

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  return (
    <div>
      {/* Assignment Name */}
      <h1>{assignment.name}</h1>

      {/* Progress Bar (TODO) */}
      <ProblemProgress
        currentProblemIndex={currentProblemIndex}
        totalNumProblems={assignment.problems.length}
      />

      {/* Problem content (TODO) */}
      <Problem problem={assignment.problems[currentProblemIndex]}></Problem>

      {/* Prev / Next */}
      <div>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentProblemIndex(currentProblemIndex - 1);
          }}
        >
          <ArrowBackIosIcon />
          Previous One
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentProblemIndex(currentProblemIndex + 1);
          }}
        >
          Next One
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
};

export default Assignment;
