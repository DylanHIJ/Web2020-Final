import React, { useState, useEffect } from "react";
import { Container, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MetadataEditor from "./AddProblems/MetadataEditor";
import ProblemEditor from "./AddProblems/ProblemEditor";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import GENERATE_ASSIGNMENT_TEMPLATE from "../../templates/assignment";
import {
  GET_ASSIGNMENT,
  UPDATE_ASSIGNMENT_INFO,
  UPDATE_PROBLEM_INFO,
  CREATE_PROBLEM,
} from "../../graphql";
import Loading from "../Loading";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const EmptyInfo = {
  name: "",
  beginTime: "20210101T00:00:00",
  endTime: "20211231T00:00:00",
  weight: 0,
};

const useStyles = makeStyles({
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
  },
});

const AddProblem = (props) => {
  const { create } = props;
  const { aid } = useParams();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [metadata, setMetadata] = useState(GENERATE_ASSIGNMENT_TEMPLATE());
  const [problems, setProblems] = useState([]);

  const [updateAssignmentInfo] = useMutation(UPDATE_ASSIGNMENT_INFO);
  const [updateProblemInfo] = useMutation(UPDATE_PROBLEM_INFO);
  const [createProblem] = useMutation(CREATE_PROBLEM);

  const { loading, data } = useQuery(GET_ASSIGNMENT, {
    variables: { aid: aid },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!loading && !create) {
      const metadata = {
        courseID: data.assignment.courseID,
        name: data.assignment.info.name,
        beginTime: new Date(parseInt(data.assignment.info.beginTime, 10)),
        endTime: new Date(parseInt(data.assignment.info.endTime, 10)),
        weight: data.assignment.info.weight,
      };
      setMetadata(metadata);
      setProblems(data.assignment.problems);
    }
  }, [loading, data, create]);

  if (loading) return <Loading />;

  if (!create) {
    // Retrieve metadata and problems from server
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // const createProblem = () => {
  //   console.log("Submitting problems to server......");
  //   // Question: How do we wait for all setStates done and them finally we can submit to server?
  //   // TODO - 1. Create assignment with metadata
  //   // TODO - 2. Upload problems one by one
  // };

  return (
    <Container maxWidth="lg" style={{ marginTop: "6%" }}>
      {/* Metadata Editor */}
      <MetadataEditor metadata={metadata} setMetadata={setMetadata} />

      {/* Problem Detail Editor */}
      <ProblemEditor problems={problems} setProblems={setProblems} />

      <Container maxWidth="sm" className={classes.buttonContainer}>
        {/* TODO */}
        <Button
          onClick={async () => {
            if (create) createProblem();
            else {
              await updateAssignmentInfo({
                variables: {
                  aid: aid,
                  name: metadata.name,
                  beginTime: metadata.beginTime.toString(),
                  endTime: metadata.endTime.toString(),
                  weight: parseFloat(metadata.weight),
                },
              });
              for (let i = 0; i < problems.length; i++) {
                if (problems[i]._id === undefined)
                  await createProblem({
                    variables: {
                      aid: aid,
                      type: problems[i].type,
                      point: 10,
                      statement: problems[i].statement,
                      options: problems[i].options,
                      answers: problems[i].answers,
                      keywords: problems[i].keywords.map((keyword) => ({
                        color: keyword.color,
                        word: keyword.word,
                      })),
                    },
                  });
                else {
                  await updateProblemInfo({
                    variables: {
                      pid: problems[i]._id,
                      type: problems[i].type,
                      point: 10,
                      statement: problems[i].statement,
                      options: problems[i].options,
                      answers: problems[i].answers,
                      keywords: problems[i].keywords.map((keyword) => ({
                        color: keyword.color,
                        word: keyword.word,
                      })),
                    },
                  });
                }
              }
              setOpen(true);
            }
          }}
          variant="outlined"
        >
          {create ? "Create" : "Save Changes"}
        </Button>
      </Container>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Changes have been saved!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProblem;
