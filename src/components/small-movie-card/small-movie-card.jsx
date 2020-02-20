import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

const SmallMovieCard = (props) => {

  const {title, imgSrc, previewSrc} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <VideoPlayer
        isPlaying={false}
        poster={imgSrc}
        src={previewSrc}
        // onMouseOver={onMovieHover}
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
};

export default SmallMovieCard;
