import React, { useState } from "react";
import PropTypes from "prop-types";
import MuiAlert from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { SupervisorAccount, EmojiPeople } from "@material-ui/icons";
import { ADD_USER_TO_COURSE } from "../graphql";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  title: {
    marginTop: "6%",
    marginBottom: "1%",
  },
});

export default function Members() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { cid } = useParams();
  const [addUserToCourse] = useMutation(ADD_USER_TO_COURSE);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClickStudent = async () => {
    await addUserToCourse({
      variables: { email: email, cid: cid, TA: false },
    });
    setOpen(true);
  };

  const handleClickTA = async () => {
    await addUserToCourse({
      variables: { email: email, cid: cid, TA: true },
    });
    setOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" className={classes.title}>
        Members
      </Typography>
      <hr />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="email"
          label="Email"
          style={{ margin: 8, width: "30%" }}
          placeholder="Email"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 8 }}
        onClick={handleClickStudent}
        startIcon={<EmojiPeople />}
      >
        Add New Student
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 8 }}
        onClick={handleClickTA}
        startIcon={<SupervisorAccount />}
      >
        Add New TA
      </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          User {email} has been added to course!
        </Alert>
      </Snackbar>
    </Container>
  );
}
