import {extend} from '../../utils.js';
import adapter from './adapter.js';

const ALL_GENRES = `All genres`;
const DEFAULT_MOVIES_COUNT = 8;

const initialState = {
  movie: [],
  currentGenre: `All genres`,
  moviesByGenre: [],
  showedMovies: [],
  moviesCount: DEFAULT_MOVIES_COUNT,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_MOVIES_COUNT: `RESET_MOVIES_COUNT`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),

  getMoviesByGenre: (movies, genre) => {
    let moviesByGenre = [];

    switch (genre) {
      case ALL_GENRES:
        moviesByGenre = movies;
        break;

      case genre:
        moviesByGenre = movies.filter((movie) => movie.genre === genre);
        break;

      default:
        moviesByGenre = movies;
        break;
    }

    return {
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: moviesByGenre,
    };
  },

  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: DEFAULT_MOVIES_COUNT,
  }),

  resetMoviesCount: () => ({
    type: ActionType.RESET_MOVIES_COUNT,
  }),

  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: movies,
    };
  },

  loadPromoMovie: (movie) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: movie,
    };
  },
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const adaptedData = response.data.map((item) => adapter(item));
        dispatch(ActionCreator.loadMovies(adaptedData));
      });
  },
  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        const adaptedData = adapter(response.data);
        dispatch(ActionCreator.loadPromoMovie(adaptedData));
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
      return extend(state, {
        moviesByGenre: action.payload,
      });

    case ActionType.SHOW_MORE_MOVIES:
      const moviesCount = state.moviesCount + action.payload;
      return extend(state, {
        moviesCount,
        showedMovies: state.moviesByGenre.slice(0, moviesCount),
      });

    case ActionType.RESET_MOVIES_COUNT:
      return extend(state, {
        moviesCount: 0
      });

    case ActionType.LOAD_MOVIES:
      return extend(state, {
        moviesByGenre: action.payload,
        showedMovies: action.payload.slice(0, state.moviesCount),
      });

    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        movie: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
