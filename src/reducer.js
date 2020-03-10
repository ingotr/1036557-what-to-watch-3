import {extend} from "./utils.js";

const ALL_GENRES = `All genres`;

const initialState = {
  currentGenre: `All genres`,
  moviesByGenre: [],
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
