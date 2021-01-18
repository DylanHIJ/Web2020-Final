import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useRouteMatch, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
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
import { GET_COURSE_ASSIGNMENTS } from "../graphql";

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
  navlink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

// const assignments = {
//   upcoming: [
//     { id: "1", name: "Homework 0xA" },
//     { id: "2", name: "Homework 0xB" },
//     { id: "3", name: "Homework 0xC" },
//   ],
//   due: [
//     { id: "4", name: "Homework 0x8" },
//     { id: "5", name: "Homework 0x9" },
//   ],
// };

export default function Assignments(props) {
  const { isTA } = props;
  const classes = useStyles();
  const match = useRouteMatch();
  const { cid } = useParams();
  const { loading, data } = useQuery(GET_COURSE_ASSIGNMENTS, {
    variables: { cid: cid },
  });
  if (loading) return "Loading";

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
            {data.course.assignments
              .filter(
                (assignment) =>
                  new Date(parseInt(assignment.endTime, 10)) >= new Date()
              )
              .map((assignment) => (
                <NavLink
                  to={{
                    pathname: `${match.url}/${assignment._id}`,
                    state: { isTA: isTA },
                  }}
                  className={classes.navlink}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <NotesRounded />
                    </ListItemIcon>
                    <ListItemText
                      primary={assignment.name}
                      secondary={`Deadline: ${new Date(
                        parseInt(assignment.endTime, 10)
                      )}`}
                    />
                  </ListItem>
                </NavLink>
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
            {data.course.assignments
              .filter(
                (assignment) =>
                  new Date(parseInt(assignment.endTime, 10)) < new Date()
              )
              .map((assignment) => (
                <NavLink
                  to={{
                    pathname: `${match.url}/${assignment._id}`,
                    state: { isTA: isTA },
                  }}
                  className={classes.navlink}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <NotesRounded />
                    </ListItemIcon>
                    <ListItemText
                      primary={assignment.name}
                      secondary={`Deadline: ${new Date(
                        parseInt(assignment.endTime, 10)
                      )}`}
                    />
                  </ListItem>
                </NavLink>
              ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
