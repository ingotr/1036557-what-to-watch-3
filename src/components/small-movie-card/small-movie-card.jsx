import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

const SmallMovieCard = (props) => {

  const {title, imgSrc, previewSrc, onMovieHover} = props;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver={onMovieHover}>
      {/* <div className="small-movie-card__image">
        <img src={imgSrc} alt={title} width="280" height="175" />
      </div> */}
      <VideoPlayer
        isPlaying={false}
        poster={imgSrc}
        src={previewSrc}
      />
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  previewSrc: PropTypes.string.isRequired,

  onMovieHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
