import * as React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/data/data';
import {getMoviesByGenre, getMoviesCount} from '../../reducer/data/selectors';
import {MovieInterface} from '../../types';

interface Props {
  moviesByGenre: MovieInterface[];
  moviesCount: number;
  onShowMoreButtonClick: (moviesCount: number) => void;
}

const ButtonShowMore: React.FunctionComponent<Props> = (Props) => {

  const {moviesByGenre, moviesCount, onShowMoreButtonClick} = Props;

  return moviesByGenre.length > moviesCount ?
    <div className="catalog__more">
      <button className="catalog__button"
        type="button"
        onClick={
          (event) => {
            event.preventDefault();
            onShowMoreButtonClick(moviesCount);
          }
        }>Show more</button>
    </div> : null;
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
