import {extend} from '../../utils.js';
import adapter from './adapter.js';
import {commentsAdapter} from './adapter.js';
// import {getNewMoviesList} from './helpers/helpers';

const DEFAULT_MOVIES_COUNT = 8;
const RESPONSE_STATUS_OK = 200;

const initialState = {
  movie: {},
  movies: [],
  currentGenre: `All genres`,
  moviesByGenre: [],
  showedMovies: [],
  moviesCount: DEFAULT_MOVIES_COUNT,
  myListMovies: null,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  CHANGE_MOVIES_COUNT: `CHANGE_MOVIES_COUNT`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  CHANGE_FAVORITE_STATUS: `CHANGE_FAVORITE_STATUS`,
  LOAD_MY_LIST_MOVIES: `LOAD_MY_LIST_MOVIES`,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),

  getMoviesByGenre: (genre) => ({
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: genre,
  }),

  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: DEFAULT_MOVIES_COUNT,
  }),

  changeMoviesCount: (movieCount) => {
    return {
      type: ActionType.CHANGE_MOVIES_COUNT,
      payload: movieCount,
    };
  },

  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },

  loadPromoMovie: (movie) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movie,
    };
  },

  changeFavoriteStatus: (movieId) => {
    return {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: movieId,
    };
  },

  loadMyListMovies: (movies) => {
    return {
      type: ActionType.LOAD_MY_LIST_MOVIES,
      payload: movies,
    };
  },
};

const loadComments = (item) => (dispatch, getState, api) => {
  return api.get(`/comments/${item.id}`)
    .then((response) => {
      item.reviews = response.data.map((review) => commentsAdapter(review));
    });
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const adaptedData = response.data.map((item) => {
          const adaptedItem = adapter(item);
          dispatch(loadComments(adaptedItem));
          return adaptedItem;
        });
        dispatch(ActionCreator.loadMovies(adaptedData));
      });
  },
  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        return adapter(response.data);
      })
      .then((movie) => {
        dispatch(loadComments(movie));
        return movie;
      })
      .then((movie) => {
        dispatch(ActionCreator.loadPromoMovie(movie));
      });
  },
  changeFavoriteStatus: (movieId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movieId}/${status}`)
      .then((response) => {
        if (response.status === RESPONSE_STATUS_OK) {

          const state = getState().DATA;
          const movies = state.movies;
          const promoMovie = state.movie;

          if (promoMovie.id === movieId) {
            const changedPromoMovie = extend(promoMovie, {favorite: !promoMovie.favorite});
            dispatch(ActionCreator.loadPromoMovie(changedPromoMovie));
          }

          const changedMovies = movies.map((item) => {
            if (item.id === movieId) {
              item.favorite = !item.favorite;
            }
            return item;
          });
          dispatch(ActionCreator.loadMovies(changedMovies));

          dispatch(ActionCreator.changeFavoriteStatus(movieId));
        }
      });
  },
  loadMyListMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const adaptedData = response.data.map((item) => {
          const adaptedItem = adapter(item);
          dispatch(loadComments(adaptedItem));
          return adaptedItem;
        });
        dispatch(ActionCreator.loadMyListMovies(adaptedData));
      })
      .catch(() => {
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.GET_MOVIES_BY_GENRE:
      const {movies} = state;
      const genre = action.payload;

      if (genre === `All genres`) {
        return extend(state, {
          moviesByGenre: movies
        });
      }

      return extend(state, {
        moviesByGenre: movies.filter((movie) => movie.genre === genre),
      });

    case ActionType.SHOW_MORE_MOVIES:
      const moviesCount = state.moviesCount + action.payload;
      return extend(state, {
        moviesCount,
        showedMovies: state.moviesByGenre.slice(0, moviesCount),
      });

    case ActionType.CHANGE_MOVIES_COUNT:
      return extend(state, {
        moviesCount: action.payload,
      });

    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
        moviesByGenre: action.payload,
        showedMovies: action.payload.slice(0, state.moviesCount),
      });

    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        movie: action.payload,
      });

    case ActionType.LOAD_MY_LIST_MOVIES:
      return extend(state, {
        myListMovies: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};


