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

const returnMovies = (action, state) => {
  const movies = action.payload === null ? state.movies : action.payload;
  return movies.filter((movie) => movie.genre === state.genre);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: returnGenre(action, state),
      });

    case ActionType.GET_MOVIES_BY_GENRE:
      return extend(state, {
        movies: returnMovies(action, state),
      });
  }

  return state;
};

export {reducer, ActionType};
