import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

class CatalogMoviesList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, onMovieHover} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => (
          <SmallMovieCard
            key={movie.id}
            title={movie.title}
            imgSrc={movie.imgSrc}
            previewSrc={movie.previewSrc}
            onMovieHover={onMovieHover}
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

  onMovieHover: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.showedFilms,
});

export {CatalogMoviesList};

export default connect(mapStateToProps)(CatalogMoviesList);
