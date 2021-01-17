import React from "react";
import Highlighter from "./Highlighter";

import { getStudentResponse } from "../utils";

const CorrectionModule = (props) => {
  const { assignmentID, problemID, studentID, keywords } = props;

  console.log(studentID);

  const studentResponse = getStudentResponse(
    assignmentID,
    problemID,
    studentID
  );

  console.log(studentResponse, keywords);

  return (
    <div>
      <Highlighter
        text={studentResponse.text}
        keywords={keywords}
      ></Highlighter>
    </div>
  );
};

export default CorrectionModule;
