import React from "react";
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
  return (
    <>
      <Typography variant="h4" component="h2" className={classes.title}>
        Web Programming
      </Typography>
      <hr />
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PermIdentity />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Instructor" secondary="Laxingyang" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTime />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Class Time" secondary="Wed. 678" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Room />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Classroom" secondary="R103" />
        </ListItem>
      </List>
    </>
  );
}
