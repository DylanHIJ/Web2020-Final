import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ExpandMore, NotesRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    width: "100%",
  },
}));

const assignments = {
  upcoming: [
    { name: "Homework 0xA" },
    { name: "Homework 0xB" },
    { name: "Homework 0xC" },
  ],
  due: [{ name: "Homework 0x8" }, { name: "Homework 0x9" }],
};

export default function Assignments() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" className={classes.title}>
        Assignments
      </Typography>
      <Accordion defaultExpanded="true">
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" className={classes.heading}>
            Upcoming Assignments
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            component="nav"
            aria-label="main mailbox folders"
            className={classes.list}
          >
            {assignments["upcoming"].map((assignment) => (
              <ListItem button>
                <ListItemIcon>
                  <NotesRounded />
                </ListItemIcon>
                <ListItemText primary={assignment.name} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded="true">
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6" className={classes.heading}>
            Due Assignments
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            component="nav"
            aria-label="main mailbox folders"
            className={classes.list}
          >
            {assignments["due"].map((assignment) => (
              <ListItem button>
                <ListItemIcon>
                  <NotesRounded />
                </ListItemIcon>
                <ListItemText primary={assignment.name} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
