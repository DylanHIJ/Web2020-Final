import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function ProblemProgress(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          value={(props.currentProblemIndex / props.totalNumProblems) * 100}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {props.currentProblemIndex} / {props.totalNumProblems}
        </Typography>
      </Box>
    </Box>
  );
}

ProblemProgress.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  currentProblemIndex: PropTypes.number.isRequired,
  totalNumProblems: PropTypes.number.isRequired,
};

export default ProblemProgress;
