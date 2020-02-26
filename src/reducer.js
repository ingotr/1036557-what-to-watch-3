import {extend} from "./utils.js";

const initialState = {
  genre: `All genres`,
  movies: [],
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
};

const returnGenre = (action, state) => {
  return action.payload === null ? state.genre : action.payload;
};

const getCurrentGenres = (movies) => {
  let currentGenres = [];
  for (const movie of movies) {
    if (!currentGenres.includes(movie.genre)) {
      currentGenres.push(movie.genre);
    }
  }

  return currentGenres;
};

const returnMoviesByGenre = (action, state) => {
  const movies = action.payload === null ? state.movies : action.payload;
  const currentGenres = getCurrentGenres(movies);

  switch (state.genre) {
    case (currentGenres.includes(state.genre)):
      return movies.filter((movie) => movie.genre === state.genre);

    case (state.genre = `All genres`):
    default:
      return movies;
  }
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),

  getMoviesByGenre: (movies) => ({
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: movies,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: returnGenre(action, state),
      });

    case ActionType.GET_MOVIES_BY_GENRE:
      return extend(state, {
        movies: returnMoviesByGenre(action, state),
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
