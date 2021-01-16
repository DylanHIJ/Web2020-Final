import TrueFalse from "./TrueFalse";
import MultipleChoice from "./MultipleChoice";
import CheckboxProblem from "./Checkbox";
import ShortQA from "./ShortQA";

const Problem = (props) => {
  const { problem } = props;
  console.log(problem);
  if (problem.type === "TF") {
    console.log("tf");
    return <TrueFalse {...props}></TrueFalse>;
  } else if (problem.type === "MULTIPLE_CHOICE") {
    console.log("mc");
    return <MultipleChoice {...props}></MultipleChoice>;
  } else if (problem.type === "CHECKBOX") {
    console.log("cb");
    return <CheckboxProblem {...props}></CheckboxProblem>;
  } else if (problem.type === "SHORT_QA") {
    console.log("sq");
    return <ShortQA {...props}></ShortQA>;
  }
};

export default Problem;
