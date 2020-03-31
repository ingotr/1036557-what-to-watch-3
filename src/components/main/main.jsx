import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CatalogMoviesList from '../catalog-movies-list/catalog-movies-list.jsx';
import GenreList from '../genre-list/genre-list.jsx';
import {connect} from 'react-redux';
import ButtonShowMore from '../button-show-more/button-show-more.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {getAuthorizationStatus, getAvatarUrl} from "../../reducer/user/selectors";
import {Link} from 'react-router-dom';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import VideoPlayerFull from '../video-player-full/video-player-full.jsx';

const CatalogMoviesListWrapped = withActiveItem(CatalogMoviesList);
const GenreListWrapperd = withActiveItem(GenreList);

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {film, onMouseClick, onMovieHover,
      activeItem, onItemEnter, onItemLeave,
      authorizationStatus, avatarUrl, onFilmFavoriteStatusClick} = this.props;
    const {name, genre, year, cover, poster} = film;

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
                <a className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              {
                (authorizationStatus === AuthorizationStatus.AUTH) ?
                  (<div className="user-block">
                    <div className="user-block__avatar">
                      <img
                        src={avatarUrl}
                        alt="User avatar"
                        width="63"
                        height="63"
                      />
                    </div>
                  </div>) : (
                    <div className="user-block"><Link to="/login">Sign In</Link></div>
                  )
              }
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__info">
                <div
                  onClick={onMouseClick}
                  className="movie-card__poster">
                  <img src={poster} alt="{name}" width="218" height="327" />
                </div>

                <div className="movie-card__desc">
                  <h2
                    onClick={onMouseClick}
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
                        onItemEnter(film);
                      }}
                      type="button"
                    >
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use></use>
                      </svg>
                      <span>Play</span>
                    </button>
                    <button
                      className="btn btn--list movie-card__button"
                      type="button"
                      onClick={() => {
                        onFilmFavoriteStatusClick(film.id, +!film.favorite);
                      }}
                    >
                      {film.favorite ?
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          <use xlinkHref="#add"></use>
                        </svg> :
                        <svg viewBox="0 0 18 14" width="18" height="14">
                          <use xlinkHref="#in-list"></use>
                        </svg>
                      }
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

              <GenreListWrapperd />

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
        {activeItem && (<VideoPlayerFull film={film} onItemLeave={onItemLeave} />)}
      </>
    );
  }
}

Main.propTypes = {
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
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired,

          date: PropTypes.string.isRequired,
          rating: PropTypes.number,
        })
    ),
  }),

  onMouseClick: PropTypes.func.isRequired,
  onMovieHover: PropTypes.func.isRequired,

  onItemEnter: PropTypes.func.isRequired,
  onItemLeave: PropTypes.func.isRequired,
  activeItem: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  avatarUrl: getAvatarUrl(state)
});

export {Main};

export default connect(mapStateToProps)(Main);
