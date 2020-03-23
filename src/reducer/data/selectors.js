import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getMoviesByGenre = (state) => {
  return state[NAME_SPACE].moviesByGenre;
};

export const getPromoMovie = (state) => {
  return state[NAME_SPACE].movie;
};

export const getCurrentGenre = (state) => {
  return state[NAME_SPACE].currentGenre;
};

export const getShowedMovies = (state) => {
  return state[NAME_SPACE].showedMovies;
};

export const getMoviesCount = (state) => {
  return state[NAME_SPACE].moviesCount;
};
