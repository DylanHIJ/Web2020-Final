import TrueFalse from "./TrueFalse";
import MultipleChoice from "./MultipleChoice";
import CheckboxProblem from "./Checkbox";
import ShortQA from "./ShortQA";
import { Container, Typography } from "@material-ui/core";

const Problem = (props) => {
  const { problem } = props;

  return (
    <Container fullWidth style={{ marginTop: 24 }}>
      <Typography variant="h5" component="h4">
        {problem.statement}
      </Typography>

      {/* Different problem */}
      {problem.type === "TF" ? (
        <TrueFalse {...props}></TrueFalse>
      ) : problem.type === "MULTIPLE_CHOICE" ? (
        <MultipleChoice {...props}></MultipleChoice>
      ) : problem.type === "CHECKBOX" ? (
        <CheckboxProblem {...props}></CheckboxProblem>
      ) : problem.type === "SHORT_QA" ? (
        <ShortQA {...props}></ShortQA>
      ) : (
        <p>ERROR</p>
      )}
    </Container>
  );
};

export default Problem;
