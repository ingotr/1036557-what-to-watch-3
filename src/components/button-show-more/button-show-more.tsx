import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/data/data.js';
import {getMoviesByGenre, getMoviesCount} from '../../reducer/data/selectors.js';

const ButtonShowMore = (props) => {

  const {moviesByGenre, moviesCount, onShowMoreButtonClick} = props;

  return moviesByGenre.length > moviesCount ?
    <div className="catalog__more">
      <button className="catalog__button"
        type="button"
        onClick={
          (event) => {
            event.preventDefault();
            onShowMoreButtonClick();
          }
        }>Show more</button>
    </div> : null;
};

ButtonShowMore.propTypes = {
  moviesByGenre: PropTypes.array,
  moviesCount: PropTypes.number,

  onShowMoreButtonClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  moviesByGenre: getMoviesByGenre(state),
  moviesCount: getMoviesCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick: () => {
    dispatch(ActionCreator.showMoreMovies());
  }
});

export {ButtonShowMore};
export default connect(mapStateToProps, mapDispatchToProps)(ButtonShowMore);
