import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs.jsx';
import CatalogMoviesList from '../catalog-movies-list/catalog-movies-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import VideoPlayerFull from '../video-player-full/video-player-full.jsx';

const CatalogMoviesListWrapped = withActiveItem(CatalogMoviesList);
const TabsWrapped = withActiveItem(Tabs);

const SAME_GENRE_MOVIES_MAX_LENGTH = 4;

const MoviePage = (props) => {
  const {movies, film, onItemEnter, onItemLeave, activeItem} = props;
  const {name, genre, runtime, year, poster, rating, director, description, starring, reviews} = film;
  const {big, bigAlt} = poster;
  const {score, level, count} = rating;

  const getSameGenreMovies = () => {
    return (movies.filter((movie) => movie.genre === genre)).slice(0, SAME_GENRE_MOVIES_MAX_LENGTH);
  };

  return (
    <Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
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
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  onClick={() => {
                    onItemEnter(film);
                  }}
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={big} alt={bigAlt} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <TabsWrapped
                genre={genre}
                year={year}
                runtime={runtime}
                score={score}
                level={level}
                count={count}
                director={director}
                description={description}
                starring={starring}
                reviews={reviews}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <CatalogMoviesListWrapped
            movies={getSameGenreMovies()}
            onMovieHover={() => { }}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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
      {activeItem && (<VideoPlayerFull film={film} onItemLeave={onItemLeave} />)}
    </Fragment>
  );
};

MoviePage.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    runtime: PropTypes.shape({
      hours: PropTypes.number.isRequired,
      minutes: PropTypes.number.isRequired,
    }),
    poster: PropTypes.shape({
      big: PropTypes.string.isRequired,
      bigAlt: PropTypes.string.isRequired,
    }),
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
    previewSrc: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.array.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,

          dateTime: PropTypes.shape({
            string: PropTypes.string.isRequired,
            reviewYear: PropTypes.number.isRequired,
            month: PropTypes.string.isRequired,
            day: PropTypes.number.isRequired,
          }).isRequired,

          rating: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
  }),

  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
        previewSrc: PropTypes.string.isRequired,
      })
  ).isRequired,

  onItemEnter: PropTypes.func.isRequired,
  onItemLeave: PropTypes.func.isRequired,
  activeItem: PropTypes.any,
};

export default MoviePage;
