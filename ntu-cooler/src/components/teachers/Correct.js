import React, { useState } from "react";
import getStudentList from "./utils";

const Correction = (props) => {
  const { assignment_id, problem_id } = props;
  const studentList = getStudentList(assignment_id, problem_id);

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  return (
    <div>
      {/* Assignment Name */}
      <h1>Yeah</h1>
    </div>
  );
};

export default Correction;
