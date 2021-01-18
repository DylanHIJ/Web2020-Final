import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useRouteMatch, NavLink } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import {
  PermIdentity,
  AccessTime,
  Room,
  Description,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { GET_ASSIGNMENT } from "../graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  title: {
    marginTop: "6%",
    marginBottom: "1%",
  },
  info: {
    marginTop: "3%",
  },
  button: {
    marginTop: "1%",
    marginRight: "2%",
  },
  navlink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function AssignmentTA(props) {
  const { isTA } = props;
  const classes = useStyles();
  const { aid } = useParams();
  const match = useRouteMatch();
  const { loading, data } = useQuery(GET_ASSIGNMENT, {
    variables: { aid: aid },
    fetchPolicy: "no-cache",
  });

  if (loading) return "Loading";

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.title}>
        {data.assignment.name}
      </Typography>
      <hr />
      <Typography variant="h6" component="h2" color="primary">
        Begin Time:{" "}
        {new Date(parseInt(data.assignment.beginTime, 10)).toString()}
      </Typography>
      <Typography variant="h6" component="h2" color="primary">
        End Time: {new Date(parseInt(data.assignment.endTime, 10)).toString()}
      </Typography>
      <NavLink
        to={{ pathname: `${match.url}/modification`, state: { isTA: isTA } }}
        className={classes.navlink}
      >
        <Button variant="outlined" className={classes.button}>
          Modification
        </Button>
      </NavLink>
      <NavLink
        to={{ pathname: `${match.url}/grading`, state: { isTA: isTA } }}
        className={classes.navlink}
      >
        <Button variant="outlined" className={classes.button}>
          Grading
        </Button>
      </NavLink>
    </>
  );
}
