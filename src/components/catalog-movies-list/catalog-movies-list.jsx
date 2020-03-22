import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';
import {getMoviesByGenre, getMoviesCount} from '../../reducer/data/selectors.js';

class CatalogMoviesList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, moviesCount, onItemEnter, onItemLeave} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.slice(0, moviesCount).map((movie) => (
          <SmallMovieCard
            key={movie.id}
            title={movie.title}
            imgSrc={movie.imgSrc}
            previewSrc={movie.previewSrc}
            onMovieHover={onItemEnter}
            onMovieLeave={onItemLeave}
          />
        ))}
      </div>
    );
  }
}

CatalogMoviesList.propTypes = {

  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
        previewSrc: PropTypes.string.isRequired,
      })
  ).isRequired,

  moviesCount: PropTypes.number.isRequired,

  onMovieHover: PropTypes.func.isRequired,
  onItemEnter: PropTypes.func.isRequired,
  onItemLeave: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMoviesByGenre(state),
  moviesCount: getMoviesCount(state),
});

export {CatalogMoviesList};

export default connect(mapStateToProps)(CatalogMoviesList);
