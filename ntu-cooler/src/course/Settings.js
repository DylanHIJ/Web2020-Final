import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COURSE_INFO, UPDATE_COURSE_INFO } from "../graphql";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    marginTop: "6%",
    marginBottom: "1%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function AccountEdit() {
  const classes = useStyles();
  const { cid } = useParams();
  const [open, setOpen] = React.useState(false);
  const [classroom, setClassroom] = useState("");
  const [classTime, setClassTime] = useState("");
  const [description, setDescription] = useState("");
  const { loading, data } = useQuery(GET_COURSE_INFO, {
    variables: { cid: cid },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!loading) {
      setClassroom(data.course.info.classroom);
      setClassTime(data.course.info.classTime);
      setDescription(data.course.info.describe);
    }
  }, [loading, data]);

  const [updateCourseInfo] = useMutation(UPDATE_COURSE_INFO);

  const handleButtonClick = async () => {
    await updateCourseInfo({
      variables: {
        cid: cid,
        name: data.course.info.name,
        teacher: data.course.info.teacher,
        describe: description,
        classTime: classTime,
        classroom: classroom,
      },
    });
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  if (loading)
    return (
      <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" className={classes.title}>
          Course Settings
        </Typography>
        <hr />
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="course-name"
            label="Course Name"
            style={{ margin: 16, width: "50%" }}
            placeholder="Course Name"
            margin="normal"
            value={data.course.info.name}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="instructor"
            label="Instructor"
            style={{ margin: 16, width: "50%" }}
            placeholder="Instructor"
            margin="normal"
            value={data.course.info.teacher}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="class-time"
            label="Class Time"
            style={{ margin: 16, width: "50%" }}
            placeholder="Class Time"
            margin="normal"
            value={classTime}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setClassTime(e.target.value)}
          />
          <TextField
            id="classroom"
            label="Classroom"
            style={{ margin: 16, width: "50%" }}
            placeholder="Classroom"
            margin="normal"
            value={classroom}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setClassroom(e.target.value)}
          />
          <TextField
            id="description"
            label="Description"
            style={{ margin: 16, width: "50%" }}
            placeholder="Description"
            margin="normal"
            multiline
            rows="3"
            value={description}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 16, display: "block" }}
          onClick={handleButtonClick}
        >
          Save
        </Button>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Changes have been saved!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
