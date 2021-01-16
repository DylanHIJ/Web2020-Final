import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
}));

export default function AccountEdit() {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.title}>
        Course Settings
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="course-name"
          label="Course Name"
          style={{ margin: 16, width: "50%" }}
          placeholder="Course Name"
          margin="normal"
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
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="classroom"
          label="Classroom"
          style={{ margin: 16, width: "50%" }}
          placeholder="Classroom"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="description"
          label="Description"
          style={{ margin: 16, width: "50%" }}
          placeholder="Description"
          margin="normal"
          multiline
          rows="3"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 16, display: "block" }}
      >
        Save
      </Button>
    </>
  );
}
