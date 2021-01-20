import React, { useEffect, useState, useRef } from "react";
import Selector from "./Selector";
import {
  Card,
  Grid,
  IconButton,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const ControlPanel = (props) => {
  const {
    problemID,
    students,
    studentID,
    setStudentID,
    scores,
    setScores,
    maxScore,
  } = props;

  const [studentIndex, setStudentIndex] = useState(
    students.findIndex((ele) => ele === studentID)
  );

  const [inputScoreValid, setInputScoreValid] = useState(true);
  const [inputScoreString, setInputScoreString] = useState("0");
  const [inputCommentString, setInputCommentString] = useState("");

  const inputScoreRef = useRef(null);

  useEffect(() => {
    inputScoreRef.current.focus();
  }, [studentID]);

  useEffect(() => {
    const number =
      inputScoreString === "" ? undefined : parseFloat(inputScoreString);

    if (number === undefined) {
      setInputScoreValid(true);
    } else if (isNaN(number) || number < 0 || maxScore < number) {
      setInputScoreValid(false);
    } else {
      setInputScoreValid(true);
      setScores((prev) => ({
        ...prev,
        [problemID]: {
          ...prev[problemID],
          [studentID]: {
            score: number,
            comment: prev[problemID][studentID].comment,
            graded: true,
          },
        },
      }));
    }
  }, [inputScoreString]);

  useEffect(() => {
    setScores((prev) => ({
      ...prev,
      [problemID]: {
        ...prev[problemID],
        [studentID]: {
          score: prev[problemID][studentID].score,
          comment: inputCommentString,
          graded: prev[problemID][studentID],
        },
      },
    }));
  }, [inputCommentString]);

  const handleEnterAndShiftEnter = (event) => {
    if (
      event.code === "Enter" &&
      !event.shiftKey &&
      inputScoreValid &&
      studentIndex !== students.length - 1
    ) {
      setStudentIndex((prev) => {
        setStudentID(students[prev + 1]);
        return prev + 1;
      });
    } else if (
      event.code === "Enter" &&
      event.shiftKey &&
      inputScoreValid &&
      studentIndex !== 0
    ) {
      setStudentIndex((prev) => {
        setStudentID(students[prev - 1]);
        return prev - 1;
      });
    }
  };

  return (
    <Card variant="outlined" style={{ minHeight: "360px" }}>
      <CardContent>
        {/* Prev / Next Student */}
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <IconButton
              onClick={() => {
                setStudentIndex((prev) => {
                  setStudentID(students[prev - 1]);
                  return prev - 1;
                });
              }}
              disabled={studentIndex === 0 || !inputScoreValid}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Selector
              name="Students"
              value={studentID}
              updateFunc={(value) => {
                setStudentID(value);
                setStudentIndex(students.findIndex((ele) => ele === value));
              }}
              options={students.map((ele) => ({
                ID: ele,
                description: `${ele}`,
                // TODO: change schema to make students returning a list of student infos
                // description: `${ele.name} (${ele})`,
              }))}
            />
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                setStudentIndex((prev) => {
                  setStudentID(students[prev + 1].studentID);
                  return prev + 1;
                });
              }}
              disabled={
                studentIndex === students.length - 1 || !inputScoreValid
              }
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Score Input */}
        <Container maxWidth="sm" style={{ marginTop: "12px" }}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={4}>
              <TextField
                inputRef={inputScoreRef}
                id="score"
                key={`${problemID}-${studentID}-score`}
                placeholder="0"
                defaultValue={scores[problemID][studentID].score}
                onChange={(event) => {
                  setInputScoreString(event.target.value);
                }}
                onKeyDown={handleEnterAndShiftEnter}
                error={!inputScoreValid}
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">&nbsp; of {maxScore}</Typography>
            </Grid>
          </Grid>
        </Container>

        {/* Comment Box */}
        {/* <Container maxWidth="md" style={{ marginTop: "24px" }}>
          <TextField
            id="comment"
            key={`${problemID}-${studentID}-comment`}
            placeholder="Some comments"
            onChange={(event) => {
              setInputCommentString(event.target.value);
            }}
            onKeyDown={handleEnterAndShiftEnter}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Container> */}
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
