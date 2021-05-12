import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Rating from "@material-ui/lab/Rating";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "60ch",
  },
  reviewBlock: {
    height: "relative",
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    textAlign: "left",
    margin: "8px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  reviewtextcss: {
    marginTop: "10px",
    fontSize: "18px",
  },
}));

function Reviews(props) {
  const classes = useStyles();
  console.log("Reviews", props.reviews);
  return (
    <div>
      <h2>Reviews</h2>
      {!props.reviews.length && (
        <Paper className={classes.paper1}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <SentimentDissatisfiedIcon />
            <span>Sorry there are no reviews for this restaurant</span>
          </div>
        </Paper>
      )}
      {props.reviews.map((item) => (
        <Paper className={classes.reviewBlock}>
          <div>
            Posted by:
            <b>{item.username}</b>
          </div>
          Rating: <Rating name="half-rating" value={item.rating} size="small" />
          <div className={classes.reviewtextcss}>{item.review}</div>
        </Paper>
      ))}
    </div>
  );
}

export default Reviews;
