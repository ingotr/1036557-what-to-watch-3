import {extend} from "./utils.js";

const initialState = {
  currentGenre: `All genres`,
  movies: [],
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
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

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),

  getMoviesByGenre: (movies, genre) => {
    const currentGenres = getCurrentGenres(movies);
    let moviesByGenre = [];

    switch (genre) {
      case (currentGenres.includes(genre)):
        moviesByGenre = movies.filter((movie) => movie.genre === genre);
        break;

      case (genre = `All genres`):
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
        movies: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
