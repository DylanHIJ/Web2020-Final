import React, { useState } from "react";
import CorrectionModule from "./corrections";
import { getStudentList } from "./utils";

const Correction = (props) => {
  const { assignmentID, problemID } = props;
  const studentList = getStudentList(assignmentID, problemID);
  const keywords = getKeywords(assignmentID, problemID);

  const { studentIndex, setStudentIndex } = useState(0);

  return (
    <div>
      {/* Assignment Name */}
      <h1>Yeah</h1>

      <CorrectionModule
        studentID={studentList[studentIndex]}
        keywords={keywords}
        {...props}
      ></CorrectionModule>
    </div>
  );
};

export default Correction;
