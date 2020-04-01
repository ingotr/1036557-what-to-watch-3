import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs.jsx';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {getAuthorizationStatus, getAvatarUrl} from '../../reducer/user/selectors.js';
import CatalogMoviesList from '../catalog-movies-list/catalog-movies-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import VideoPlayerFull from '../video-player-full/video-player-full.jsx';

const CatalogMoviesListWrapped = withActiveItem(CatalogMoviesList);
const TabsWrapped = withActiveItem(Tabs);

const SAME_GENRE_MOVIES_MAX_LENGTH = 4;

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  getSameGenreMovies() {
    const {movies, film} = this.props;
    const {genre} = film;
    return (movies.filter((movie) => movie.genre === genre)).slice(0, SAME_GENRE_MOVIES_MAX_LENGTH);
  }

  render() {
    const {film, onItemEnter, onItemLeave, activeItem,
      authorizationStatus, avatarUrl, onFilmFavoriteStatusClick, onMovieCardClick} = this.props;

    return (
      <Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={film.cover} alt={film.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <Link to="/" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>

              {
                (authorizationStatus === AuthorizationStatus.AUTH) ?
                  (<div className="user-block">
                    <Link to="/mylist">
                      <div className="user-block__avatar">
                        <img
                          src={avatarUrl}
                          alt="User avatar"
                          width="63"
                          height="63"
                        />
                      </div>
                    </Link>
                  </div>) : (
                    <div className="user-block"><Link to="/login">Sign In</Link></div>
                  )
              }
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{film.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{film.genre}</span>
                  <span className="movie-card__year">{film.year}</span>
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

                  {authorizationStatus === AuthorizationStatus.AUTH ?
                    <>
                      <button
                        className="btn btn--list movie-card__button"
                        type="button"
                        onClick={() => {
                          onFilmFavoriteStatusClick(film.id, +!film.favorite);
                        }}
                      >

                        {!film.favorite ?
                          (<svg viewBox="0 0 19 20" width="19" height="20">
                            <use xlinkHref="#add"></use>
                          </svg>) :
                          (<svg viewBox="0 0 18 14" width="18" height="14">
                            <use xlinkHref="#in-list"></use>
                          </svg>)
                        }
                        <span>My list</span>
                      </button>
                      <Link to={`/films/${film.id}/review`} className="btn movie-card__button">Add review</Link>
                    </> :
                    <>
                      <Link
                        to="/login"
                        className="btn btn--list movie-card__button"
                        type="button"
                      >
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          <use xlinkHref="#add"></use>
                        </svg>
                        <span>My list</span>
                      </Link>
                      <Link to={`/login`} className="btn movie-card__button">Add review</Link>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={film.poster} alt={film.name} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <TabsWrapped
                  film={film}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <CatalogMoviesListWrapped
              movies={this.getSameGenreMovies()}
              onMovieCardClick={onMovieCardClick}
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
  }
}

MoviePage.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  onFilmFavoriteStatusClick: PropTypes.func.isRequired,

  film: PropTypes.shape({
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
    favorite: PropTypes.bool,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          author: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }).isRequired,

          date: PropTypes.string,
          rating: PropTypes.number,
        })
    ),
  }),

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
        favorite: PropTypes.bool,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string,
              author: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
              }).isRequired,

              date: PropTypes.string.isRequired,
              rating: PropTypes.number,
            })
        ),
      })
  ),

  onItemEnter: PropTypes.func.isRequired,
  onItemLeave: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  activeItem: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  avatarUrl: getAvatarUrl(state),
});

export {MoviePage};

export default connect(mapStateToProps)(MoviePage);
