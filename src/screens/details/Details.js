import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import "./Details.css";
import YouTube from "react-youtube";

// material-ui imports
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import RatingStars from "../../common/rating-stars/RatingStars";

function Details(props) {
  const [movieDetails, setMovieDetails] = useState();

  const getMovieDetails = () => {
    fetch(props.baseUrl + `movies/${props.match.params.id}`, {
      method: "GET",
      headhers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <div className="details-page-container">
      <Header
        isLoggedIn={false}
        loginHandler={() => {}}
        logoutHandler={() => {}}
        bookShowHandler={() => {}}
      />
      <Typography
        component="div"
        className="back-to-home-button"
        onClick={() => {
          props.history.goBack();
        }}>
        &#60; Back to home
      </Typography>
      {movieDetails && (
        <div className="main-container">
          <div className="left">
            <img src={movieDetails.poster_url} alt={movieDetails.title} />
          </div>
          <div className="middle">
            <Typography variant="headline" component="h2">
              {movieDetails.title}
            </Typography>
            <Typography>
              <span className="bold-text">Genre:</span>{" "}
              {movieDetails.genres.join(", ")}
            </Typography>
            <Typography>
              <span className="bold-text">Duration:</span>{" "}
              {movieDetails.duration}
            </Typography>
            <Typography>
              <span className="bold-text">Release Date:</span>{" "}
              {new Date(movieDetails.release_date).toDateString()}
            </Typography>
            <Typography>
              <span className="bold-text">Rating:</span> {movieDetails.rating}
            </Typography>
            <div className="plot-block">
              <Typography>
                <span className="bold-text">Plot:</span>{" "}
                <a href={movieDetails.wiki_url}>(Wiki Link)</a>{" "}
                {movieDetails.storyline}
              </Typography>
            </div>
            <div className="trailer-block">
              <Typography className="bold-text">Trailer:</Typography>
              <YouTube
                videoId={new URL(movieDetails.trailer_url).searchParams.get(
                  "v"
                )}
                onReady={onReady}
                opts={{
                  width: "100%",
                }}
              />
            </div>
          </div>
          <div className="right">
            <Typography className="bold-text">Rate this movie:</Typography>
            <div className="rating-stars-container">
              <RatingStars />
            </div>
            <Typography className="artists-block-title bold-text">
              Artists:
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
