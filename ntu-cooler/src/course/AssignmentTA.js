import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useRouteMatch, NavLink } from "react-router-dom";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@material-ui/core";
import { Edit, Check, AccessTime, AccessAlarm } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { GET_ASSIGNMENT } from "../graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 480,
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
        {data.assignment.info.name}
      </Typography>
      <hr />
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTime />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Begin Time"
            secondary={new Date(
              parseInt(data.assignment.info.beginTime, 10)
            ).toString()}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessAlarm />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="End Time"
            secondary={new Date(
              parseInt(data.assignment.info.endTime, 10)
            ).toString()}
          />
        </ListItem>
      </List>
      <NavLink
        to={{ pathname: `${match.url}/modification`, state: { isTA: isTA } }}
        className={classes.navlink}
      >
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<Edit />}
        >
          Modification
        </Button>
      </NavLink>
      <NavLink
        to={{ pathname: `${match.url}/grading`, state: { isTA: isTA } }}
        className={classes.navlink}
      >
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<Check />}
        >
          Grading
        </Button>
      </NavLink>
    </>
  );
}
