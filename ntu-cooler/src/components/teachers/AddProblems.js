import React, { useState } from "react";
import { Container, Button, Grid } from "@material-ui/core";
import MetadataEditor from "./AddProblems/MetadataEditor";
import ProblemEditor from "./AddProblems/ProblemEditor";

import GENERATE_ASSIGNMENT_TEMPLATE from "../../templates/assignment";

const EmptyInfo = {
  name: "",
  beginTime: "20210101T00:00:00",
  endTime: "20211231T00:00:00",
  weight: 0,
};

const AddProblem = (props) => {
  const { create } = props;

  const [metadata, setMetadata] = useState(GENERATE_ASSIGNMENT_TEMPLATE());
  const [problems, setProblems] = useState([]);

  if (!create) {
    // Retrieve metadata and problems from server
  }

  const createProblem = () => {
    console.log("Submitting problems to server......");
    // Question: How do we wait for all setStates done and them finally we can submit to server?
    // TODO - 1. Create assignment with metadata
    // TODO - 2. Upload problems one by one
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "6%" }}>
      {/* Metadata Editor */}
      <MetadataEditor metadata={metadata} setMetadata={setMetadata} />

      {/* Problem Detail Editor */}
      <ProblemEditor problems={problems} setProblems={setProblems} />

      <Container maxWidth="sm">
        <Grid container justify="center">
          <Grid item xs={12}>
            {/* TODO */}
            <Button
              onClick={() => {
                createProblem();
              }}
            >
              Save (Help me), I don't know how to center the button CSS needs to
              be improved
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default AddProblem;
