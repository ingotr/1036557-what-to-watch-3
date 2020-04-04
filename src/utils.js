export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const testFunc = () => {
};

export const getMovieRatingLevel = (rating) => {
  let level = ``;
  if ((rating >= 0) && (rating < 3)) {
    level = `Bad`;
  }
  if ((rating >= 3) && (rating < 5)) {
    level = `Normal`;
  }
  if ((rating >= 5) && (rating < 8)) {
    level = `Good`;
  }
  if ((rating >= 8) && (rating < 10)) {
    level = `Very good`;
  }
  if (rating === 10.0) {
    level = `Awesome`;
  }
  return level;
};
