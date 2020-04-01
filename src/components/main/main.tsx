import * as React from 'react'
import CatalogMoviesList from '../catalog-movies-list/catalog-movies-list';
import GenreList from '../genre-list/genre-list';
import {connect} from 'react-redux';
import ButtonShowMore from '../button-show-more/button-show-more';
import {AuthorizationStatus} from '../../reducer/user/user';
import {getAuthorizationStatus, getAvatarUrl} from '../../reducer/user/selectors';
import {Link} from 'react-router-dom';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import VideoPlayerFull from '../video-player-full/video-player-full';
import {MovieInterface} from '../../types';

const CatalogMoviesListWrapped = withActiveItem(CatalogMoviesList);
const GenreListWrapperd = withActiveItem(GenreList);

interface Props {
  authorizationStatus: string;
  avatarUrl: string;
  activeItem: any;
  onMovieFavoriteStatusClick: (movie: string, status: number) => void;
  onItemEnter: (movie: MovieInterface) => void;
  onItemLeave: () => void;
  onMovieCardClick: (movie: MovieInterface | null) => void;
  movie: MovieInterface;
}

class Main extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {movie, onMovieCardClick,
      activeItem, onItemEnter, onItemLeave,
      authorizationStatus, avatarUrl, onMovieFavoriteStatusClick} = this.props;
    const {name, genre, year, cover, poster} = movie;

    return (
      <>
        <div className="main">
          <section className="movie-card">
            <div className="movie-card__bg">
              <img src={cover} alt={name} />
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
              <div className="movie-card__info">
                <div
                  className="movie-card__poster">
                  <img src={poster} alt="{name}" width="218" height="327" />
                </div>

                <div className="movie-card__desc">
                  <h2
                    className="movie-card__title"
                  >{name}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{genre}</span>
                    <span className="movie-card__year">{year}</span>
                  </p>

                  <div className="movie-card__buttons">

                    <button
                      className="btn btn--play movie-card__button"
                      onClick={() => {
                        onItemEnter(movie);
                      }}
                      type="button"
                    >
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use></use>
                      </svg>
                      <span>Play</span>
                    </button>

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
                            <svg viewBox="0 0 19 20" width="19" height="20">
                              <use xlinkHref="#add"></use>
                            </svg> :
                            <svg viewBox="0 0 18 14" width="18" height="14">
                              <use xlinkHref="#in-list"></use>
                            </svg>
                          }
                          <span>My list</span>
                        </button>
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
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="page-content">
            <section className="catalog">
              <h2 className="catalog__title visually-hidden">Catalog</h2>

              <GenreListWrapperd />

              <CatalogMoviesListWrapped
                onMovieCardClick={onMovieCardClick}
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
        {activeItem && (<VideoPlayerFull movie={movie} onItemLeave={onItemLeave} />)}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  avatarUrl: getAvatarUrl(state)
});

export {Main};

export default connect(mapStateToProps)(Main);
