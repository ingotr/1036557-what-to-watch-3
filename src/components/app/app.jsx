import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const mouseClickHandler = () => {};
const movieHoverHandler = () => {};

const App = (props) => {

  const {title, genre, releaseDate, movies} = props;
  return (
    <Main
      title={title}
      genre={genre}
      releaseDate={releaseDate}
      movies={movies}
      onMouseClick={mouseClickHandler}
      onMovieHover={movieHoverHandler}
    />
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,

  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
      })
  ).isRequired,
};

export default App;
