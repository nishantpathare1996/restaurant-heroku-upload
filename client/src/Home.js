import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "center",
    height: "800px",
  },
  image: {
    width: "1000px",
  },
  loginBox: { marginTop: "250px" },
}));

function Home() {
  const [zip, setzip] = useState(60616);

  const handleChange = (e) => {
    setzip(e.target.value);
  };
  const classes = useStyles();
  return (
    <div className={classes.box}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <img
            src="https://res.cloudinary.com/instaaaa-clone/image/upload/v1618579761/1_ctuzoh.jpg"
            className={classes.image}
          />
        </Grid>
        <Grid item xs={3}>
          <div className={classes.loginBox}>
            {" "}
            <h2>Find Restaurants near you</h2>
            <div>
              <TextField
                id="outlined-basic"
                label="Enter Zip Code..."
                variant="outlined"
                onChange={handleChange}
              />
            </div>
            <div>
              <Link to={`/landing/${zip}`}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "50px", marginTop: "10px" }}
                >
                  Find Food
                </Button>
              </Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
