import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

const CatalogMoviesList = (props) => {
  const {movies, onMovieHover} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => (
        <SmallMovieCard
          key={movie.id}
          title={movie.title}
          imgSrc={movie.imgSrc}
          onMovieHover={onMovieHover}
        />
      ))}
    </div>
  );
};

CatalogMoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
      })
  ).isRequired,

  onMovieHover: PropTypes.func.isRequired,
};

export default CatalogMoviesList;
