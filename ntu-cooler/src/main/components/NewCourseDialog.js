import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, DialogTitle, Dialog, TextField } from "@material-ui/core";

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
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="instructor"
          label="Instructor"
          fullWidth
          style={{ margin: 16 }}
          placeholder="Instructor"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="class-time"
          label="Class Time"
          fullWidth
          style={{ margin: 16 }}
          placeholder="Class Time"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="classroom"
          label="Classroom"
          fullWidth
          style={{ margin: 16 }}
          placeholder="Classroom"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
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
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <Button variant="contained" color="primary" className={classes.button}>
        Add
      </Button>
    </Dialog>
  );
}
