import React, { useState } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import CorrectionModule from "./corrections";
import { getAssignment, getProblems, getStudentList } from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
  quarter: {
    float: "left",
    width: "20%",
  },
  half: {
    float: "left",
    width: "60%",
  },
  row: {},
}));

const Correction = (props) => {
  const { assignmentID } = props;

  const classes = useStyles();

  const assignment = getAssignment(assignmentID);
  const problems = getProblems(assignmentID);
  const studentList = getStudentList(assignmentID);

  console.log(problems);

  const [problemIndex, setProblemIndex] = useState(0);
  const [problem, setProblem] = useState(problems[0]);

  const [studentIndex, setStudentIndex] = useState(0);

  return (
    <div>
      {/* Assignment Name */}
      <Typography variant="h4" component="h2" className={classes.title}>
        {assignment.name} (Correction Mode)
      </Typography>

      <div>
        <div className={classes.quarter}>PROBLEM_SELECTOR</div>
        <div className={classes.half}>
          <Typography variant="h5" component="h2">
            Q: {problem.statement}
          </Typography>
        </div>
        <div className={classes.quarter}>STUDENT_SELECTOR</div>

        <div style={{ display: "table", clear: "both" }}></div>
      </div>

      <CorrectionModule
        assignmentID={assignmentID}
        problemID={problem.problemID}
        studentID={studentList[studentIndex]}
        keywords={problem.keywords}
      ></CorrectionModule>
    </div>
  );
};

export default Correction;
