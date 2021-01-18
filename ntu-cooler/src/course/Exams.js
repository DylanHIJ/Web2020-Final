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
    marginBottom: "1%",
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

export default function Assignments() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" className={classes.title}>
        Exams
      </Typography>
      <hr />
      <Accordion defaultExpanded="true">
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" className={classes.heading}>
            Upcoming Exams/Quizzes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            component="nav"
            aria-label="main mailbox folders"
            className={classes.list}
          >
            <ListItem button>
              <ListItemIcon>
                <NotesRounded />
              </ListItemIcon>
              <ListItemText primary="Final Exam" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NotesRounded />
              </ListItemIcon>
              <ListItemText primary="Quiz 3" />
            </ListItem>
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
            Past Exams/Quizzes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            component="nav"
            aria-label="main mailbox folders"
            className={classes.list}
          >
            <ListItem button>
              <ListItemIcon>
                <NotesRounded />
              </ListItemIcon>
              <ListItemText primary="Midterm Exam" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NotesRounded />
              </ListItemIcon>
              <ListItemText primary="Quiz 2" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NotesRounded />
              </ListItemIcon>
              <ListItemText primary="Quiz 1" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
