import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StarRateIcon from "@material-ui/icons/StarRate";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { getTilesIds } from "google-map-react";
import small_1 from "../assets/rating_logos/small_1.png";
import small_1_half from "../assets/rating_logos/small_1_half.png";
import small_2 from "../assets/rating_logos/small_2.png";
import small_2_half from "../assets/rating_logos/small_2_half.png";
import small_3 from "../assets/rating_logos/small_3.png";
import small_3_half from "../assets/rating_logos/small_3_half.png";
import small_4 from "../assets/rating_logos/small_4.png";
import small_4_half from "../assets/rating_logos/small_4_half.png";
import small_5 from "../assets/rating_logos/small_5.png";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "300px",
    minHeight: "200px",
    margin: 10,
  },
  media: {
    height: 140,
  },
  right: {
    float: "right",
    fontSize: "20px",
  },
  outerdiv: {
    display: "flex",
    margin: 0,
    minHeight: "200px",
    minWidth: "100%",
    overflowX: "auto",
  },
}));

export default function ScrollCards2(props) {
  const classes = useStyles();

  return (
    <div className={classes.outerdiv}>
      {props.query
        ? props.restaurants.map((tile) => (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={tile.item.image_url}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    {tile.item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {tile.item.location.address1}, {tile.item.location.city},{" "}
                    {tile.item.location.state}-{tile.item.location.zip_code}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container>
                  <Grid item xs={5}>
                    <Link to={`/restaurants/${tile.item.id}`}>
                      <Button size="small" color="primary">
                        View Review
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    {(() => {
                      if (tile.item.rating == 1) {
                        return <img src={small_1} alt="rating" />;
                      } else if (tile.item.rating == 1.5) {
                        return <img src={small_1_half} alt="rating" />;
                      } else if (tile.item.rating == 2) {
                        return <img src={small_2} alt="rating" />;
                      } else if (tile.item.rating == 2.5) {
                        return <img src={small_2_half} alt="rating" />;
                      } else if (tile.item.rating == 3) {
                        return <img src={small_3} alt="rating" />;
                      } else if (tile.item.rating == 3.5) {
                        return <img src={small_3_half} alt="rating" />;
                      } else if (tile.item.rating == 4) {
                        return <img src={small_4} alt="rating" />;
                      } else if (tile.item.rating == 4.5) {
                        return <img src={small_4_half} alt="rating" />;
                      } else if (tile.item.rating == 5) {
                        return <img src={small_5} alt="rating" />;
                      }
                    })()}
                  </Grid>
                  <Grid item xs={3}>
                    {tile.item.price}
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          ))
        : props.restaurants.map((tile) => (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={tile.image_url}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    {tile.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {tile.location.address1}, {tile.location.city},{" "}
                    {tile.location.state}-{tile.location.zip_code}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container>
                  <Grid item xs={5}>
                    <Link to={`/restaurants/${tile.id}`}>
                      <Button size="small" color="primary">
                        View Review
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    {(() => {
                      if (tile.rating == 1) {
                        return <img src={small_1} alt="rating" />;
                      } else if (tile.rating == 1.5) {
                        return <img src={small_1_half} alt="rating" />;
                      } else if (tile.rating == 2) {
                        return <img src={small_2} alt="rating" />;
                      } else if (tile.rating == 2.5) {
                        return <img src={small_2_half} alt="rating" />;
                      } else if (tile.rating == 3) {
                        return <img src={small_3} alt="rating" />;
                      } else if (tile.rating == 3.5) {
                        return <img src={small_3_half} alt="rating" />;
                      } else if (tile.rating == 4) {
                        return <img src={small_4} alt="rating" />;
                      } else if (tile.rating == 4.5) {
                        return <img src={small_4_half} alt="rating" />;
                      } else if (tile.rating == 5) {
                        return <img src={small_5} alt="rating" />;
                      }
                    })()}
                  </Grid>
                  <Grid item xs={3}>
                    {tile.price}
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          ))}
    </div>
  );
}
