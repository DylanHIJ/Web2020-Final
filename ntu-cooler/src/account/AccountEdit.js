import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { Button, TextField, Typography, Snackbar } from "@material-ui/core";
import { GET_USER_INFO, UPDATE_USER_INFO } from "../graphql";
import { useQuery, useMutation } from "@apollo/client";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
  errorMessage: {
    color: "red",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AccountEdit() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);
  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: { token: Cookies.get("token") },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!loading) {
      setName(data.user.name);
    }
  }, [loading, data]);

  const handleClick = async () => {
    if (name === "") {
      setEmptyName(true);
    } else {
      setEmptyName(false);
      if (newPassword !== newPassword2) {
        setError(true);
      } else if (newPassword === "") {
        updateUserInfo({
          variables: {
            email: data.user.email,
            name: name,
          },
        });
        setOpen(true);
      } else {
        const result = await updateUserInfo({
          variables: {
            email: data.user.email,
            name: name,
            currentPassword: currentPassword,
            newPassword: newPassword,
          },
        });
        if (result.data.updateUserInfo.type === "Error") setErrorOpen(true);
        else setOpen(true);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  if (loading) return "Loading";
  return (
    <>
      <Typography variant="h4" component="h2" className={classes.title}>
        Profile
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="email"
          label="Email"
          style={{ margin: 16, width: "50%" }}
          placeholder="Email"
          margin="normal"
          value={data.user.email}
          disabled
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="name"
          label="Name"
          style={{ margin: 16, width: "50%" }}
          placeholder="Name"
          margin="normal"
          value={name}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setName(e.target.value)}
        />
        {emptyName ? (
          <p className={classes.errorMessage}>Name cannot be empty.</p>
        ) : (
          <></>
        )}
        <TextField
          id="current-password"
          label="Current Password"
          type="password"
          style={{ margin: 16, width: "50%" }}
          placeholder="Current password"
          margin="normal"
          value={currentPassword}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          id="new-password"
          label="Enter New Password"
          type="password"
          style={{ margin: 16, width: "50%" }}
          placeholder="New password"
          margin="normal"
          value={newPassword}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          id="new-password2"
          label="Enter New Password Again"
          type="password"
          style={{ margin: 16, width: "50%" }}
          placeholder="New password"
          margin="normal"
          value={newPassword2}
          error={error}
          helperText={error ? "Must be the same with previous field!" : ""}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setNewPassword2(e.target.value)}
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 16, display: "block" }}
        onClick={handleClick}
      >
        Save
      </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Changes have been saved!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorOpen}
        autoHideDuration={5000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          Wrong password!
        </Alert>
      </Snackbar>
    </>
  );
}
