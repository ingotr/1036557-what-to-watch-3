import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/data/data.js';
import {getCurrentGenre, getMovies} from '../../reducer/data/selectors.js';

const DEFAULT_GENRE = `All genres`;
const ACTIVE_GENRE_ELEMENT = `catalog__genres-item--active`;
const GENRE_LIST_MAX_LENGTH = 9;
const DEFAULT_MOVIE_COUNT = 8;

class GenreList extends PureComponent {

  render() {
    const {movies, onGenreElementClick, onItemEnter, currentGenre} = this.props;

    const returnCurrentGenres = () => {
      let currentGenres = [DEFAULT_GENRE];
      movies.map((movie) => {
        if (!currentGenres.includes(movie.genre)) {
          currentGenres.push(movie.genre);
        }
      });

      return currentGenres;
    };

    const genresList = returnCurrentGenres().slice(0, GENRE_LIST_MAX_LENGTH);

    const returnCurrentGenreElement = (genre) => {
      return currentGenre === genre ? ACTIVE_GENRE_ELEMENT : ``;
    };

    const returnGenresList = () => {
      const genresElements = [];
      for (const genre of genresList) {
        const genreFragment =
          <Fragment key={genre + genresList.indexOf(genre)}>
            <li className={`catalog__genres-item ${returnCurrentGenreElement(genre)}`}>
              <a
                href="#"
                className="catalog__genres-link"
                onClick={(evt) => {
                  evt.preventDefault();
                  onGenreElementClick(genre);
                  onItemEnter(genre);
                }}
              >{genre}</a>
            </li>
          </Fragment>;
        genresElements.push(genreFragment);
      }
      return genresElements;
    };

    return (
      <Fragment>
        <ul className="catalog__genres-list">
          {returnGenresList()}
        </ul>
      </Fragment>
    );
  }
}

GenreList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        genre: PropTypes.string,
        year: PropTypes.number,
        image: PropTypes.string,
        poster: PropTypes.string,
        cover: PropTypes.string,
        previewSrc: PropTypes.string,
        runtime: PropTypes.string,
        rating: PropTypes.number,
        votes: PropTypes.number,
        director: PropTypes.string,
        description: PropTypes.string,
        starring: PropTypes.arrayOf(PropTypes.string),
        reviews: PropTypes.array,
      })
  ),

  onGenreElementClick: PropTypes.func.isRequired,
  onItemEnter: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  currentGenre: getCurrentGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreElementClick: (genre) => {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.changeMoviesCount(DEFAULT_MOVIE_COUNT));
    dispatch(ActionCreator.getMoviesByGenre(genre));
  },
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
