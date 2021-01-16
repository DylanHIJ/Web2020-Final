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
        Profile
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Name"
          style={{ margin: 16, width: "50%" }}
          placeholder="name"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="current-password"
          label="Current Password"
          type="password"
          style={{ margin: 16, width: "50%" }}
          placeholder="Current password"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="new-password"
          label="New Password"
          type="password"
          style={{ margin: 16, width: "50%" }}
          placeholder="New password"
          margin="normal"
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
