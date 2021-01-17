import React from "react";
import Highlighter from "./Highlighter";

import { getStudentResponse } from "../utils";

const CorrectionModule = (props) => {
  const { assignmentID, problemID, studentID, keywords } = props;

  const studentResponse = getStudentResponse(
    assignmentID,
    problemID,
    studentID
  );

  return (
    <Highlighter text={studentResponse.text} keywords={keywords}></Highlighter>
  );
};

export default CorrectionModule;
