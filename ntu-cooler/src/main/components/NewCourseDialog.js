import Cookies from "js-cookie";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  DialogTitle,
  Dialog,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_COURSE, GET_USER_INFO } from "../../graphql";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "3%",
    marginRight: "3%",
  },
  button: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%",
    marginBottom: "3%",
  },
});

export default function NewCourseDialog(props) {
  const classes = useStyles();
  const { handleClose, open } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [description, setDescription] = useState("");
  const [classTime, setClassTime] = useState("");
  const [classroom, setClassroom] = useState("");
  const [emptyCourseName, setEmptyCourseName] = useState(false);
  const [emptyTeacher, setEmptyTeacher] = useState(false);
  const [emptyClassTime, setEmptyClassTime] = useState(false);
  const [emptyClassroom, setEmptyClassroom] = useState(false);
  const [emptyDescription, setEmptyDescription] = useState(false);
  const [createCourse] = useMutation(CREATE_COURSE);
  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: { token: Cookies.get("token") },
    fetchPolicy: "no-cache",
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClick = () => {
    setEmptyCourseName(!courseName);
    setEmptyTeacher(!teacher);
    setEmptyClassTime(!classTime);
    setEmptyClassroom(!classroom);
    setEmptyDescription(!description);
    if (courseName && teacher && classTime && classroom && description) {
      createCourse({
        variables: {
          name: courseName,
          teacher: teacher,
          describe: description,
          classTime: classTime,
          classroom: classroom,
          TAs: data.user.email,
        },
      });
      setSnackbarOpen(true);
    }
  };

  if (loading) return "Loading";
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add New Course</DialogTitle>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="course-name"
          label="Course Name"
          fullWidth
          style={{ margin: 16 }}
          placeholder="Course Name"
          margin="normal"
          value={courseName}
          InputLabelProps={{
            shrink: true,
          }}
          required
          error={emptyCourseName}
          helperText={emptyCourseName ? "Course name cannot be empty" : ""}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <TextField
          id="instructor"
          label="Instructor"
          fullWidth
          style={{ margin: 16 }}
          placeholder="Instructor"
          margin="normal"
          value={teacher}
          InputLabelProps={{
            shrink: true,
          }}
          required
          error={emptyTeacher}
          helperText={emptyTeacher ? "Teacher cannot be empty" : ""}
          onChange={(e) => setTeacher(e.target.value)}
        />
        <TextField
          id="class-time"
          label="Class Time"
          fullWidth
          style={{ margin: 16 }}
          placeholder="Class Time"
          margin="normal"
          value={classTime}
          InputLabelProps={{
            shrink: true,
          }}
          required
          error={emptyClassTime}
          helperText={emptyClassTime ? "Class Time cannot be empty" : ""}
          onChange={(e) => setClassTime(e.target.value)}
        />
        <TextField
          id="classroom"
          label="Classroom"
          fullWidth
          style={{ margin: 16 }}
          placeholder="Classroom"
          margin="normal"
          value={classroom}
          InputLabelProps={{
            shrink: true,
          }}
          required
          error={emptyClassroom}
          helperText={emptyClassroom ? "Classroom cannot be empty" : ""}
          onChange={(e) => setClassroom(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          fullWidth
          style={{ margin: 16 }}
          placeholder="Description"
          margin="normal"
          multiline
          rows="3"
          value={description}
          InputLabelProps={{
            shrink: true,
          }}
          required
          error={emptyDescription}
          helperText={emptyDescription ? "Description cannot be empty" : ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
      >
        Add
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Course "{courseName}" has been created successfully!
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
