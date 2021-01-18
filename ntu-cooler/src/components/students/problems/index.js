import { useQuery } from "@apollo/client";
import { Container, Typography } from "@material-ui/core";
import TrueFalse from "./TrueFalse";
import MultipleChoice from "./MultipleChoice";
import CheckboxProblem from "./Checkbox";
import ShortQA from "./ShortQA";
import { GET_STUDENT_PROBLEM } from "../../../graphql/queries";

const Problem = (props) => {
  const { pid } = props;

  const { loading, data } = useQuery(GET_STUDENT_PROBLEM, {
    variables: { pid: pid },
  });

  const problem = loading ? {} : data.problem;

  console.log(problem);

  if (loading) return <p>Loading</p>;

  return (
    <Container fullWidth style={{ marginTop: 24 }}>
      <Typography variant="h5" component="h4">
        {problem.statement}
      </Typography>

      {/* Different problem */}
      {problem.type === "TF" ? (
        <TrueFalse {...{ ...props, problem: problem }}></TrueFalse>
      ) : problem.type === "MULTIPLE_CHOICE" ? (
        <MultipleChoice {...{ ...props, problem: problem }}></MultipleChoice>
      ) : problem.type === "CHECKBOX" ? (
        <CheckboxProblem {...{ ...props, problem: problem }}></CheckboxProblem>
      ) : problem.type === "SHORT_QA" ? (
        <ShortQA {...{ ...props, problem: problem }}></ShortQA>
      ) : (
        <p>ERROR</p>
      )}
    </Container>
  );
};

export default Problem;
