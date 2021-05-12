import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Charts from "./Charts";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
function ChartsHome(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  const handleChange = (event) => {
    setzip(event.target.value);
  };
  const [zip, setzip] = useState(60616);
  const classes = useStyles();
  const zipCode = props.match.params.zip;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h2>Zip: {zip}</h2>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={zip}
              onChange={handleChange}
            >
              <MenuItem value={60616}>60616</MenuItem>
              <MenuItem value={60007}>60007</MenuItem>
              <MenuItem value={60176}>60176</MenuItem>
              <MenuItem value={60603}>60603</MenuItem>
              <MenuItem value={60607}>60607</MenuItem>
              <MenuItem value={60611}>60611</MenuItem>
              <MenuItem value={60615}>60615</MenuItem>
              <MenuItem value={60619}>60619</MenuItem>
              <MenuItem value={60623}>60623</MenuItem>
              <MenuItem value={60628}>60628</MenuItem>
              <MenuItem value={60018}>60018</MenuItem>
              <MenuItem value={60106}>60106</MenuItem>
              <MenuItem value={60131}>60131</MenuItem>
              <MenuItem value={60601}>60601</MenuItem>
              <MenuItem value={60625}>60625</MenuItem>
            </Select>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          {" "}
          <Paper className={classes.paper}>
            <Charts zipCode={zip} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChartsHome;
