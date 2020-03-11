import {extend} from './utils.js';
import {films} from './mocks/films.js';

const ALL_GENRES = `All genres`;
const DEFAULT_MOVIES_COUNT = 8;

const initialState = {
  currentGenre: `All genres`,
  moviesByGenre: films,
  showedMovies: films.slice(0, DEFAULT_MOVIES_COUNT),
  moviesCount: DEFAULT_MOVIES_COUNT,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_MOVIES_COUNT: `RESET_MOVIES_COUNT`,
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
  })
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
