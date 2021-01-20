import Cookies from "js-cookie";
import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Container,
} from "@material-ui/core";
import { GET_COURSE_GRADES } from "../graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  title: {
    marginTop: "6%",
    marginBottom: "1%",
    fontFamily: `'Crete Round', serif`,
  },
  tableRow: {
    fontSize: "24pt",
  },
}));

const compareDeadline = (a, b) => {
  return parseInt(a.info.endTime, 10) - parseInt(b.info.endTime, 10);
};

export default function Grades() {
  const classes = useStyles();
  const { cid } = useParams();
  const { loading, data } = useQuery(GET_COURSE_GRADES, {
    variables: { token: Cookies.get("token"), cid: cid },
  });

  if (loading) return <Loading />;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" className={classes.title}>
        Grades
      </Typography>
      <hr />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Percentage</StyledTableCell>
              <StyledTableCell align="center">Score</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...data.allAssignmentGrade]
              .sort(compareDeadline)
              .map((assignment) => (
                <StyledTableRow
                  key={assignment.assignmentID}
                  className={classes.tableRow}
                >
                  <StyledTableCell component="th" scope="row">
                    {assignment.info.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {assignment.info.weight}%
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {assignment.score === null ? "-" : assignment.score}
                  </StyledTableCell>
                  <StyledTableCell align="center">100</StyledTableCell>
                </StyledTableRow>
              ))}
            <TableRow>
              <TableCell align="right">Final Grade</TableCell>
              <TableCell align="center">
                {Math.floor(
                  data.allAssignmentGrade
                    .map((assignment) => assignment.info.weight)
                    .reduce((a, b) => a + b)
                )}
                %
              </TableCell>
              <TableCell align="center">
                {data.allAssignmentGrade
                  .map(
                    (assignment) =>
                      (assignment.info.weight / 100) * assignment.score
                  )
                  .reduce((a, b) => a + b)
                  .toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {Math.floor(
                  data.allAssignmentGrade
                    .map((assignment) => assignment.info.weight)
                    .reduce((a, b) => a + b)
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
