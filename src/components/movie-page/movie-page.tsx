import * as React from 'react';
import Tabs from '../tabs/tabs';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user';
import {getAuthorizationStatus, getAvatarUrl} from '../../reducer/user/selectors';
import CatalogMoviesList from '../catalog-movies-list/catalog-movies-list';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
// import VideoPlayerFull from '../video-player-full/video-player-full';
import {MovieInterface} from '../../types';

const CatalogMoviesListWrapped = withActiveItem(CatalogMoviesList);
const TabsWrapped = withActiveItem(Tabs);

const SAME_GENRE_MOVIES_MAX_LENGTH = 4;

interface Props {
  authorizationStatus: string;
  avatarUrl: string;
  onMovieFavoriteStatusClick: (movie: string, status: number) => void;
  onMovieCardClick: (movie: MovieInterface | null) => void;
  movie: MovieInterface;
  movies: MovieInterface[];
}

class MoviePage extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  getSameGenreMovies() {
    const {movies, movie} = this.props;
    const {genre} = movie;
    return (movies.filter((item) => item.genre === genre)).slice(0, SAME_GENRE_MOVIES_MAX_LENGTH);
  }

  render() {
    const {movie, authorizationStatus, avatarUrl,
      onMovieFavoriteStatusClick, onMovieCardClick} = this.props;

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.cover} alt={movie.name} />
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
                <h2 className="movie-card__title">{movie.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.year}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link
                    to={`/player/${movie.id}`}
                    className="btn btn--play movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>

                  {authorizationStatus === AuthorizationStatus.AUTH ?
                    <>
                      <button
                        className="btn btn--list movie-card__button"
                        type="button"
                        onClick={() => {
                          onMovieFavoriteStatusClick(movie.id, +!movie.favorite);
                        }}
                      >

                        {!movie.favorite ?
                          (<svg viewBox="0 0 19 20" width="19" height="20">
                            <use xlinkHref="#add"></use>
                          </svg>) :
                          (<svg viewBox="0 0 18 14" width="18" height="14">
                            <use xlinkHref="#in-list"></use>
                          </svg>)
                        }
                        <span>My list</span>
                      </button>
                      <Link to={`/films/${movie.id}/review`} className="btn movie-card__button">Add review</Link>
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
                <img src={movie.poster} alt={movie.name} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <TabsWrapped
                  movie={movie}
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
        {/* {activeItem && (<VideoPlayerFull movie={movie} onItemLeave={onItemLeave} />)} */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  avatarUrl: getAvatarUrl(state),
});

export {MoviePage};

export default connect(mapStateToProps)(MoviePage);
