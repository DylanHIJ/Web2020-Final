import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Divider,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  PermIdentity,
  AccessTime,
  Room,
  Description,
} from "@material-ui/icons";
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
    fetchPolicy: "no-cache",
  });
  if (loading) return "Loading";

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" className={classes.title}>
          {data.course.info.name}
        </Typography>
        <hr />
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PermIdentity />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Instructor"
              secondary={data.course.info.teacher}
            />
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
              secondary={data.course.info.classTime}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Room />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Classroom"
              secondary={data.course.info.classroom}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Description />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Description"
              secondary={data.course.info.describe}
            />
          </ListItem>
        </List>
      </Container>
    </>
  );
}
