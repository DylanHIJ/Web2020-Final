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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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

function createData(name, dueDate, perc, score, total) {
  return { name, dueDate, perc, score, total };
}

const rows = [
  createData("Homework #7", "2020/09/26 23:59", 0.1, 86, 100),
  createData("Homework #8", "2020/10/03 23:59", 0.1, 77, 100),
  createData("Homework #9", "2020/10/10 23:59", 0.1, 93, 100),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  title: {
    marginTop: "6%",
    marginBottom: "1%",
  },
});

export default function Grades() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" className={classes.title}>
        Grades
      </Typography>
      <hr />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Due Date</StyledTableCell>
              <StyledTableCell align="right">Percentage</StyledTableCell>
              <StyledTableCell align="right">Score</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.dueDate}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.perc * 100}%
                </StyledTableCell>
                <StyledTableCell align="right">{row.score}</StyledTableCell>
                <StyledTableCell align="right">{row.total}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
