import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

function Charts(props) {
  const useStyles = makeStyles((theme) => ({
    root: {},
    box: {
      maxWidth: "800px",
    },
    box1: {
      maxWidth: "500px",
    },
  }));

  const zipCode = props.zipCode;
  const [pricing, setpricing] = useState([]);
  const [ratings, setratings] = useState([]);
  const [topreviews, settopreviews] = useState([]);
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    async function anyName() {
      await axios
        .get(`http://localhost:5000/restaurants/charts/${zipCode}`)
        .then((res) => {
          console.log("for charts", res.data);
          setpricing(res.data.pricing);
          setratings(res.data.ratings);
          settopreviews(res.data.topreviews);
          setcategories(res.data.categories);
        });
    }
    anyName();
  }, [zipCode]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Data Anayltics for zip: {zipCode}</h1>
      <Divider />
      <h2>Categories wise</h2>
      <center>
        <div className={classes.box1}>
          {" "}
          <Pie
            data={{
              labels: [
                "breakfast brunch",
                "burgers",
                "cafes",
                "chinese",
                "hotdog",
                "pizza",
                "seafood",
                "steak",
                "coffee",
              ],
              datasets: [
                {
                  label: "Review Count",
                  backgroundColor: [
                    "#003f5c",
                    "#2f4b7c",
                    "#665191",
                    "#a05195",
                    "#d45087",
                    "#f95d6a",
                    "#ff7c43",
                    "#ffa600",
                    "#5f45b7",
                  ],
                  data: categories,
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </center>
      <Divider />
      <h2>How many Economical restaurants per zip</h2>
      <center>
        <div className={classes.box}>
          <Bar
            data={{
              labels: ["$$$", "$$", "$"],
              datasets: [
                {
                  label: "Number of resaturants",
                  backgroundColor: ["#2f4b7c"],
                  borderWidth: 1,
                  data: pricing,
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ` },
            }}
          />
        </div>
      </center>
      <Divider />

      <h2>How many restaurnts Rating wise</h2>
      <center>
        <div className={classes.box}>
          <Bar
            data={{
              labels: ["1 star", "2 star", "3 star", "4 star", "5 star"],
              datasets: [
                {
                  label: "Number of resatuarnts",
                  backgroundColor: ["#665191"],
                  data: ratings,
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ` },
            }}
          />
        </div>
      </center>
      <Divider />
      <h2>How many restaurants review count wise</h2>
      <center>
        <div className={classes.box}>
          {" "}
          <Bar
            data={{
              labels: topreviews.map(({ name }) => name),
              datasets: [
                {
                  label: "Review Count",
                  backgroundColor: ["#a05195"],
                  data: topreviews.map(({ review_count }) => review_count),
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ` },
            }}
          />
        </div>
      </center>
    </div>
  );
}

export default Charts;
