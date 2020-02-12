import React from 'react';
import PropTypes from 'prop-types';

const SmallMovieCard = (props) => {

  const {title, imgSrc, onMovieHover} = props;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver={onMovieHover}>
      <div className="small-movie-card__image">
        <img src={imgSrc} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,

  onMovieHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
