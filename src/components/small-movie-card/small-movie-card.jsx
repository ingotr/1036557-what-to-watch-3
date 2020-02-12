import React from 'react';
import PropTypes from 'prop-types';

const SmallMovieCard = (props) => {

  const {id, title, imgSrc, onMovieTitleClick} = props;

  return (
    <article key={id} className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={imgSrc} alt={title} width="280" height="175" />
      </div>
      <h3
        onClick={onMovieTitleClick}
        className="small-movie-card__title"
      >
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,

  onMovieTitleClick: PropTypes.func.isRequired,
};

export default SmallMovieCard;
