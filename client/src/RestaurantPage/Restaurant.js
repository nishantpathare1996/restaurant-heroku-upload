import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Reviews from "./Reviews";
import List from "@material-ui/core/List";
import SimpleMap from "./SimpleMap";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useAuth0 } from "@auth0/auth0-react";
import Rating from "@material-ui/lab/Rating";
import CallMadeIcon from "@material-ui/icons/CallMade";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function Restaurant(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    papers: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
    },
    img: {
      maxWidth: "100%",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "60ch",
    },
  }));

  const restid = props.match.params.id;
  const [restdata, setrestdata] = useState([]);
  const [address, setaddress] = useState("");
  const [reviews, setreviews] = useState([]);
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [reviewText, setreviewText] = useState("");
  const [cate, setcate] = useState("");
  const [ratingvalue, setratingvalue] = useState(1);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/restaurants/${restid}`)
      .then((res) => {
        setrestdata(res.data);
        const {
          coordinates: { latitude, longitude },
        } = res.data;
        setlatitude(latitude);
        setlongitude(longitude);
        const {
          location: { address1, city, zip_code, state },
        } = res.data;
        const address =
          address1 + " , " + city + " , " + state + " - " + zip_code;
        setaddress(address);
      })

      .catch((err) => {
        console.log("error", err);
      });

    axios
      .get(`http://localhost:5000/reviews/${restid}`)
      .then((rev) => setreviews(rev.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    axios
      .post(`http://localhost:5000/reviews/${restid}`, {
        userid: `${user.name}`,
        rating: `${ratingvalue}`,
        username: `${user.name}`,
        review: `${reviewText}`,
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setreviewText(e.target.value);
  };

  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(restdata);
  console.log(ratingvalue);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h2>Categories</h2>
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemText primary="Breakfast & Brunch" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Burgers" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Cafes" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Chinese" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Hot Dogs" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Pizza" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Seafood" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Steakhouses" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <h2>{restdata.name}</h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <img className={classes.img} src={restdata.image_url} />
                </Paper>
                <Paper className={classes.paper}>
                  <h2>Write review</h2>
                  {isAuthenticated && (
                    <Paper>
                      {" "}
                      <Rating
                        name="half-rating"
                        value={ratingvalue}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          setratingvalue(newValue);
                        }}
                      />
                      <TextField
                        id="outlined-full-width"
                        label="Review"
                        style={{ margin: 8 }}
                        placeholder="Start Writing here..."
                        className={classes.textField}
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                      />
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </div>
                    </Paper>
                  )}
                  {!isAuthenticated && <p>Please login to write review</p>}
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.papers}>
                  <h3>Location: {address}</h3>
                  <h3>Phone: {restdata.display_phone}</h3>
                  <h3>Price: {restdata.price}</h3>
                  <h3>
                    Status:{" "}
                    {restdata.is_closed ? (
                      <span>Closed</span>
                    ) : (
                      <span>Open</span>
                    )}
                  </h3>
                  <h4>
                    Website: <a href={restdata.url}>link </a>
                  </h4>
                </Paper>
                <Reviews reviews={reviews} restid={restid} />
              </Grid>
            </Grid>
          </Paper>
          <Paper>
            <SimpleMap latitude={latitude} longitude={longitude} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Restaurant;
