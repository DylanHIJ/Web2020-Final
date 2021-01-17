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
    students.findIndex((ele) => ele.studentID === studentID)
  );

  const [inputValid, setInputValid] = useState(true);
  const [inputScoreString, setInputScoreString] = useState("0");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    const number = inputScoreString === "" ? 0 : parseFloat(inputScoreString);
    if (isNaN(number) || number < 0 || maxScore < number) {
      setInputValid(false);
    } else {
      setInputValid(true);
      setScores((prev) => {
        console.log(prev);
        return {
          ...prev,
          [studentID]: {
            score: number,
          },
        };
      });
    }
  }, [inputScoreString]);

  return (
    <Card variant="outlined" style={{ minHeight: "360px" }}>
      <CardContent>
        {/* Prev / Next Student */}
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <IconButton
              onClick={() => {
                setStudentIndex((prev) => {
                  setStudentID(students[prev - 1].studentID);
                  return prev - 1;
                });
              }}
              disabled={studentIndex === 0}
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
                setStudentIndex(
                  students.findIndex((ele) => ele.studentID === value)
                );
              }}
              options={students.map((ele) => ({
                ID: ele.studentID,
                description: `${ele.name} (${ele.studentID})`,
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
              disabled={studentIndex === students.length - 1}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Score Input */}
        <Container maxWidth="sm" style={{ marginTop: "6px" }}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={4}>
              <TextField
                inputRef={inputRef}
                id="answer_field"
                key={`${problemID}-${studentID}`}
                placeholder={0}
                // defaultValue={scores[studentID].score}
                onChange={(event) => {
                  setInputScoreString(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (
                    event.code === "Enter" &&
                    inputValid &&
                    studentIndex !== students.length - 1
                  ) {
                    setStudentIndex((prev) => {
                      setStudentID(students[prev + 1].studentID);
                      return prev + 1;
                    });
                  } else if (
                    event.code === "Enter" &&
                    event.shiftKey &&
                    inputValid &&
                    studentIndex !== 0
                  ) {
                    setStudentIndex((prev) => {
                      setStudentID(students[prev - 1].studentID);
                      return prev - 1;
                    });
                  }
                }}
                error={!inputValid}
                variant="outlined"
                margin="dense"
                style={{ textAlign: "right" }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">&nbsp; of {maxScore}</Typography>
            </Grid>
          </Grid>
        </Container>
        {/* Comment Box */}
        <p>{JSON.stringify(scores)} for debug &lt;3</p>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
