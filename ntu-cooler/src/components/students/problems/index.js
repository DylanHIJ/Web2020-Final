import TrueFalse from "./TrueFalse";
import MultipleChoice from "./MultipleChoice";
import CheckboxProblem from "./Checkbox";
import ShortQA from "./ShortQA";

const Problem = (props) => {
  const { problem } = props;
  console.log(problem);
  if (problem.type === "TF") {
    console.log("tf");
    return <TrueFalse problem={problem}></TrueFalse>;
  } else if (problem.type === "MULTIPLE_CHOICE") {
    console.log("mc");
    return <MultipleChoice problem={problem}></MultipleChoice>;
  } else if (problem.type === "CHECKBOX") {
    console.log("cb");
    return <CheckboxProblem problem={problem}></CheckboxProblem>;
  } else if (problem.type === "SHORT_QA") {
    console.log("sq");
    return <ShortQA problem={problem}></ShortQA>;
  }
};

export default Problem;
