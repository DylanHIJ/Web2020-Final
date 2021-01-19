import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useRouteMatch, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ExpandMore, NotesRounded, Add } from "@material-ui/icons";
import { GET_COURSE_ASSIGNMENTS } from "../graphql";
import Loading from "../components/Loading";

const compareDeadline = (a, b) => {
  return parseInt(a.info.endTime, 10) - parseInt(b.info.endTime, 10);
};

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "6%",
    marginBottom: "1%",
  },
  root: {
    display: "flex",
  },
  list: {
    width: "100%",
  },
  navlink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function Assignments(props) {
  const { isTA } = props;
  const classes = useStyles();
  const match = useRouteMatch();
  const { cid } = useParams();
  const { loading, data } = useQuery(GET_COURSE_ASSIGNMENTS, {
    variables: { cid: cid },
  });
  if (loading) return <Loading />;
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" className={classes.title}>
        Assignments
      </Typography>
      <hr />
      {isTA ? (
        <Accordion defaultExpanded={true}>
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
                    new Date(parseInt(assignment.info.beginTime, 10)) >
                    new Date()
                )
                .sort(compareDeadline)
                .map((assignment) => (
                  <NavLink
                    to={{
                      pathname: `${match.url}/${assignment._id}`,
                      state: { isTA: isTA },
                    }}
                    className={classes.navlink}
                    key={assignment._id}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <NotesRounded />
                      </ListItemIcon>
                      <ListItemText
                        primary={assignment.info.name}
                        secondary={`Deadline: ${new Date(
                          parseInt(assignment.info.endTime, 10)
                        )}`}
                      />
                    </ListItem>
                  </NavLink>
                ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ) : (
        <></>
      )}
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" className={classes.heading}>
            Ongoing Assignments
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
                  new Date(parseInt(assignment.info.endTime, 10)) >=
                    new Date() &&
                  new Date(parseInt(assignment.info.beginTime, 10)) <=
                    new Date()
              )
              .sort(compareDeadline)
              .map((assignment) => (
                <NavLink
                  to={{
                    pathname: `${match.url}/${assignment._id}`,
                    state: { isTA: isTA },
                  }}
                  className={classes.navlink}
                  key={assignment._id}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <NotesRounded />
                    </ListItemIcon>
                    <ListItemText
                      primary={assignment.info.name}
                      secondary={`Deadline: ${new Date(
                        parseInt(assignment.info.endTime, 10)
                      )}`}
                    />
                  </ListItem>
                </NavLink>
              ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
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
                  new Date(parseInt(assignment.info.endTime, 10)) < new Date()
              )
              .sort(compareDeadline)
              .map((assignment) => (
                <NavLink
                  to={{
                    pathname: `${match.url}/${assignment._id}`,
                    state: { isTA: isTA },
                  }}
                  className={classes.navlink}
                  key={assignment._id}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <NotesRounded />
                    </ListItemIcon>
                    <ListItemText
                      primary={assignment.info.name}
                      secondary={`Deadline: ${new Date(
                        parseInt(assignment.info.endTime, 10)
                      )}`}
                    />
                  </ListItem>
                </NavLink>
              ))}
          </List>
        </AccordionDetails>
      </Accordion>
      {isTA ? (
        <NavLink
          to={{
            pathname: `${match.url}/create`,
            state: { isTA: isTA },
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: "fixed", right: "5%", bottom: "5%" }}
          >
            <Add />
          </Fab>
        </NavLink>
      ) : (
        <></>
      )}
    </Container>
  );
}
