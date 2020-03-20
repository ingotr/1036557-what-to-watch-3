import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import CatalogMoviesList from '../catalog-movies-list/catalog-movies-list.jsx';
import GenreList from '../genre-list/genre-list.jsx';
import ButtonShowMore from '../button-show-more/button-show-more.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const ALL_GENRES = `All genres`;

const CatalogMoviesListWrapped = withActiveItem(CatalogMoviesList);

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, genre, releaseDate, movies, onMouseClick, onMovieHover,
      moviesByGenre, getDefaultMovies} = this.props;

    if (moviesByGenre.length === 0) {
      getDefaultMovies(movies, ALL_GENRES);
    }

    return (
      <div className="main">
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div
                onClick={onMouseClick}
                className="movie-card__poster">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2
                  onClick={onMouseClick}
                  className="movie-card__title"
                >{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{releaseDate}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenreList
              movies={movies}
            />

            <CatalogMoviesListWrapped
              onMovieHover={onMovieHover}
            />

            <ButtonShowMore />
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,

  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
        previewSrc: PropTypes.string.isRequired,
      })
  ).isRequired,

  onMouseClick: PropTypes.func.isRequired,
  onMovieHover: PropTypes.func.isRequired,

  moviesByGenre: PropTypes.array.isRequired,
  getDefaultMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  moviesByGenre: state.moviesByGenre,
});

const mapDispatchToProps = (dispatch) => ({
  getDefaultMovies(movies, genre) {
    dispatch(ActionCreator.getMoviesByGenre(movies, genre));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
