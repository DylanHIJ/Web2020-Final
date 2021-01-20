import React from "react";
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const MetadataEditor = (props) => {
  const { metadata, setMetadata } = props;

  return (
    <Container maxWidth="md">
      <Card variant="outlined" style={{ marginTop: "30px" }}>
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            style={{
              marginTop: "12px",
              fontStyle: "italic",
            }}
          >
            Assignment Metadata
          </Typography>

          {/* Assignment Name */}
          <TextField
            id="assignment-name"
            label="Assignment Name"
            placeholder="Brilliant name for the assignment"
            variant="outlined"
            value={metadata.name}
            fullWidth
            onChange={(event) => {
              setMetadata((prev) => ({
                ...prev,
                name: event.target.value,
              }));
            }}
            style={{ marginTop: "12px", marginBottom: "24px" }}
          />

          {/* Time */}
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            style={{ marginTop: "24px", marginBottom: "24px" }}
          >
            <Grid container justify="space-between">
              <Grid item>
                <TextField
                  variant="outlined"
                  id="assignment-weight"
                  label="Assignment Weight"
                  placeholder="Weight (in %)"
                  value={metadata.weight}
                  onChange={(event) => {
                    setMetadata((prev) => ({
                      ...prev,
                      weight: event.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item>
                <KeyboardDateTimePicker
                  inputVariant="outlined"
                  ampm={false}
                  format="yyyy/MM/dd HH:mm"
                  label="Assignment begins at"
                  value={metadata.beginTime}
                  onChange={(date) => {
                    setMetadata((prev) => ({ ...prev, beginTime: date }));
                  }}
                />
              </Grid>
              <Grid item>
                <KeyboardDateTimePicker
                  inputVariant="outlined"
                  ampm={false}
                  format="yyyy/MM/dd HH:mm"
                  label="Assignment ends at"
                  value={metadata.endTime}
                  onChange={(date) => {
                    setMetadata((prev) => ({ ...prev, endTime: date }));
                  }}
                  minDate={metadata.beginTime}
                  minDateMessage="End time should not be earlier than begin time."
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MetadataEditor;
