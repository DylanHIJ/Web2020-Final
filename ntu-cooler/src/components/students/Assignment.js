import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Typography,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ProblemProgress from "./ProblemProgressBar";
import Problem from "./problems";
import {
  GET_STUDENT_ANSWER,
  GET_ASSIGNMENT,
  UPDATE_ANSWER,
} from "../../graphql";
import Cookies from "js-cookie";
import Loading from "../Loading";

// answers is an object of
// PID -> {type: string, answer: varies}
// TF: bool ; MultipleChoice: int ; Checkbox: [int] ; Text: string
const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
  problem: {
    marginLeft: "3%",
    marginBottom: "3%",
    width: "100%",
  },
}));

const Assignment = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { aid } = useParams();

  const { loading: getAssignmentLoading, data: getAssignmentData } = useQuery(
    GET_ASSIGNMENT,
    {
      variables: { aid: aid },
      fetchPolicy: "no-cache",
    }
  );

  const { loading: getAnswerLoading, data: getAnswerData } = useQuery(
    GET_STUDENT_ANSWER,
    {
      variables: { token: Cookies.get("token"), aid: aid },
      fetchPolicy: "no-cache",
    }
  );

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [updateStudentAnswer] = useMutation(UPDATE_ANSWER);

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rerender, setRerender] = useState(true);

  const submitAnswer = async () => {
    const returnAnswer = answers.map((ans) => {
      return { problemID: ans.problemID, answer: ans.answer };
    });
    const result = await updateStudentAnswer({
      variables: {
        token: Cookies.get("token"),
        aid: aid,
        data: returnAnswer,
      },
    });
    console.log(result);
    history.push("../assignments");
  };

  const getInitAnswer = (problemID, type) => {
    const ans = answers.filter((ans) => ans.problemID === problemID)[0];

    return ans ? (type === "CHECKBOX" ? ans.answer : ans.answer[0]) : null;
  };

  const updateAnswer = (problemID, type, newAnswer) => {
    console.log(`Updating answer of problem [${problemID}] -> `, newAnswer);
    setAnswers((prev) =>
      prev.map((ans) =>
        ans.problemID === problemID
          ? { ...ans, answer: type === "CHECKBOX" ? newAnswer : [newAnswer] }
          : ans
      )
    );
  };

  useEffect(() => {
    if (!getAssignmentLoading && !getAnswerLoading) {
      setAnswers(getAnswerData.answer);
    }
  }, [getAnswerData, getAnswerLoading, getAssignmentLoading]);

  useEffect(() => {
    if (getAnswerData !== undefined) {
      setLoading(false);
    }
  }, [answers]);

  if (getAssignmentLoading || getAnswerLoading || loading) return <Loading />;
  const assignment = getAssignmentLoading ? {} : getAssignmentData.assignment;

  return (
    <Container maxWidth="lg">
      {/* Assignment Name */}
      <Typography
        variant="h4"
        component="h2"
        style={{ marginTop: "6%", marginBottom: "2%" }}
      >
        {assignment.info.name}
      </Typography>

      {/* Progress Bar */}
      <ProblemProgress
        currentProblemIndex={currentProblemIndex + 1}
        totalNumProblems={assignment.problems.length}
      />

      {/* Problem content */}
      <div className={classes.problem}>
        <Problem
          key={`problem_${assignment.problems[currentProblemIndex]._id}`}
          // pid={problemIDs[currentProblemIndex]}
          problem={assignment.problems[currentProblemIndex]}
          initialAnswer={getInitAnswer(
            assignment.problems[currentProblemIndex]._id,
            assignment.problems[currentProblemIndex].type
          )}
          updateAnswer={(newAnswer) => {
            updateAnswer(
              assignment.problems[currentProblemIndex]._id,
              assignment.problems[currentProblemIndex].type,
              newAnswer
            );
          }}
          rerender={rerender}
          setRerender={setRerender}
        ></Problem>
      </div>

      {/* Prev / Next */}
      <Grid container justify="space-between" style={{ marginTop: "3%" }}>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentProblemIndex((prev) => prev - 1);
              setRerender(true);
            }}
            disabled={currentProblemIndex === 0}
          >
            <ArrowBackIosIcon />
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              if (currentProblemIndex === assignment.problems.length - 1) {
                submitAnswer();
              } else {
                setCurrentProblemIndex((prev) => prev + 1);
                setRerender(true);
              }
            }}
          >
            {currentProblemIndex === assignment.problems.length - 1
              ? "Submit"
              : "Next"}
            <ArrowForwardIosIcon />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Assignment;
