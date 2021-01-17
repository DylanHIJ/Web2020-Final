import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { PermIdentity, AccessTime, Room } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { GET_COURSE_INFO } from "../graphql";

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
}));

export default function CourseInfo() {
  const classes = useStyles();
  const { cid } = useParams();
  const { loading, data } = useQuery(GET_COURSE_INFO, {
    variables: { cid: cid },
  });
  if (loading) return "Loading";

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.title}>
        {data.course.name}
      </Typography>
      <hr />
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PermIdentity />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Instructor" secondary={data.course.teacher} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTime />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Class Time"
            secondary={data.course.classTime}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Room />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Classroom" secondary={data.course.classroom} />
        </ListItem>
      </List>
    </>
  );
}
