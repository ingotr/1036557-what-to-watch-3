const SAME_GENRE_MOVIES_MAX_LENGTH = 4;

export const getSameGenreMovies = (movie, movies) => {
  const currentMovieIndex = +movie.id;
  const index = movies.findIndex((item) => +item.id === currentMovieIndex);

  const moviesWithoutRepetition = [].concat(movies.slice(0, index),
      movies.slice(index + 1));

  const {genre} = movie;
  const sameGenreMovies = moviesWithoutRepetition.filter((item) => item.genre === genre);

  return sameGenreMovies.slice(0, SAME_GENRE_MOVIES_MAX_LENGTH);
};
