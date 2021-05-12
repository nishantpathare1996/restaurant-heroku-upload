import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ScrollCards2 from "./ScrollCards2";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import Mapss from "./Mapss";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ScrollCardsNearby from "./ScrollCardsNearby";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
function Landing(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    paperss: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      position: "relative",
      width: "100%",
      height: "40%",
    },
    searchbox: {
      marginLeft: "600px",
      marginTop: "10px",
    },
    topdiv: {
      border: "2px",
      borderStyle: "dashed",
    },
  }));

  const zipCode = props.match.params.id;
  const [listRestaurants, setlistRestaurants] = useState([]);
  const [listRestaurantsHighrating, setlistRestaurantsHighrating] = useState(
    []
  );
  const [jholrestaurant, setjholrestaurant] = useState([]);

  const [cate, setcate] = useState("breakfast_brunch");
  const [isloading, setisloading] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [query, setquery] = useState("");
  const [restaurantsforsearch, setrestaurantsforsearch] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [nearbyrestaurants, setnearbyrestaurants] = useState([]);
  const [isloadingofrest, setisloadingofrest] = useState(true);
  const onSearch = (e) => {
    setquery(e.target.value);
  };

  const fuse = new Fuse(restaurantsforsearch, {
    keys: ["name"],
    includeScore: true,
  });

  const results = fuse.search(query);

  useEffect(() => {
    function getrest() {
      axios
        .get(`http://localhost:5000/restaurants/cate/${zipCode}/${cate}`)
        .then((result) => {
          setlistRestaurants(result.data.businesses);
          setisloadingofrest(false);
        })
        .catch((err) => console.log(err));
    }
    getrest();

    async function gethighratingrest() {
      await axios
        .get(`http://localhost:5000/restaurants/highrating/${zipCode}/${cate}`)
        .then((result) => {
          setlistRestaurantsHighrating(result.data.businesses);
          setisloading(false);
        })
        .catch((err) => console.log(err));
    }
    gethighratingrest();

    async function getjholrestaurant() {
      await axios
        .get(`http://localhost:5000/restaurants/jhol/${zipCode}/${cate}`)
        .then((result) => {
          setjholrestaurant(result.data.businesses);
          setisloading(false);
        })
        .catch((err) => console.log(err));
    }
    getjholrestaurant();

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("done");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }

    if (lat === null) {
      setnearbyrestaurants(listRestaurants);
    } else {
      async function getnearbyrestaurant() {
        await axios
          .get(`http://localhost:5000/restaurants/nearby/${lat}/${lng}/${cate}`)
          .then((result) => {
            setnearbyrestaurants(result.data.businesses);
          })
          .catch((err) => console.log(err));
      }
      getnearbyrestaurant();
    }

    async function getResaurantforsearch() {
      await axios
        .get(`http://localhost:5000/restaurants/charts/${zipCode}`)
        .then((res) => {
          setrestaurantsforsearch(res.data.data);
        });
    }
    getResaurantforsearch();
  }, [cate, lat]);

  const classes = useStyles();
  const handlebreakfast = () => {
    setcate("breakfast_brunch");
    setSelectedIndex(1);
  };
  const handleburgers = () => {
    setcate("burgers");
    setSelectedIndex(2);
  };
  const handlecafes = () => {
    setcate("cafes");
    setSelectedIndex(3);
  };
  const handlechinese = () => {
    setcate("chinese");
    setSelectedIndex(4);
  };
  const handlehotdogs = () => {
    setcate("hotdog");
    setSelectedIndex(5);
  };
  const handlepizza = () => {
    setcate("pizza");
    setSelectedIndex(6);
  };
  const handleseafood = () => {
    setcate("seafood");
    setSelectedIndex(7);
  };
  const handlesteakhouses = () => {
    setcate("steak");
    setSelectedIndex(8);
  };
  console.log(listRestaurants);
  if (isloadingofrest) return <div>Loading...</div>;
  return (
    <div className={classes.root}>
      <div className={classes.searchbox}>
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          value={query}
          onChange={onSearch}
        />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <Link to={`/charts/${zipCode}`}>
              {" "}
              <Button variant="contained" color="primary">
                View Charts
              </Button>
            </Link>
          </Paper>
          <Paper className={classes.paper}>
            <h2>Categories</h2>
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem
                button
                selected={selectedIndex === 1}
                onClick={handlebreakfast}
              >
                <ListItemText primary="Breakfast & Brunch" />
              </ListItem>
              <Divider />
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={handleburgers}
              >
                <ListItemText primary="Burgers" />
              </ListItem>{" "}
              <Divider />
              <ListItem
                button
                selected={selectedIndex === 3}
                onClick={handlecafes}
              >
                <ListItemText primary="Cafes" />
              </ListItem>{" "}
              <Divider />
              <ListItem
                button
                selected={selectedIndex === 4}
                onClick={handlechinese}
              >
                <ListItemText primary="Chinese" />
              </ListItem>{" "}
              <Divider />
              <ListItem
                button
                selected={selectedIndex === 5}
                onClick={handlehotdogs}
              >
                <ListItemText primary="Hot Dogs" />
              </ListItem>{" "}
              <Divider />
              <ListItem
                button
                selected={selectedIndex === 6}
                onClick={handlepizza}
              >
                <ListItemText primary="Pizza" />
              </ListItem>{" "}
              <Divider />
              <ListItem
                button
                selected={selectedIndex === 7}
                onClick={handleseafood}
              >
                <ListItemText primary="Seafood" />
              </ListItem>{" "}
              <Divider />
              <ListItem
                button
                selected={selectedIndex === 8}
                onClick={handlesteakhouses}
              >
                <ListItemText primary="Steakhouses" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          {query && (
            <Paper className={classes.paper}>
              <h2>Search Results</h2>
              <ScrollCards2 restaurants={results} cate={cate} query={query} />
            </Paper>
          )}

          <Paper className={classes.paper}>
            <h2>Popular Restaurants Near me</h2>
            <ScrollCards2 restaurants={listRestaurants} cate={cate} />
          </Paper>
          <Paper className={classes.paper}>
            <h2>Highest Rated Restaurants Near me</h2>
            <ScrollCards2 restaurants={listRestaurantsHighrating} cate={cate} />
          </Paper>
          <Paper className={classes.paper}>
            <h2>Restaurants Closest to me</h2>
            <ScrollCardsNearby restaurants={nearbyrestaurants} />
          </Paper>
          <Paper className={classes.paper}>
            <h2>Restaurants which we think you may like</h2>
            <ScrollCards2 restaurants={jholrestaurant} cate={cate} />
          </Paper>
          <Paper className={classes.paperss}>
            <Mapss restaurants={listRestaurants} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
