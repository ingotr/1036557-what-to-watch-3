import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';
import {FirstMovie, movies} from '../../mocks/test-mocks.js';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title be pressed`, () => {
  const onMovieTitleClick = jest.fn();
  const onMovieMouseHover = jest.fn();
  const main = shallow(
      <Main
        title={FirstMovie.TITLE}
        genre={FirstMovie.GENRE}
        releaseDate={FirstMovie.RELEASE_DATE}
        movies={movies}
        onMouseClick={onMovieTitleClick}
        onMovieHover={onMovieMouseHover}
      />
  );

  const movieTitle = main.find(`.movie-card__title`);

  movieTitle.props().onClick();
});

it(`Should movie title be pressed`, () => {
  const onMovieTitleClick = jest.fn();
  const onMovieMouseHover = jest.fn();
  const main = shallow(
      <Main
        title={FirstMovie.TITLE}
        genre={FirstMovie.GENRE}
        releaseDate={FirstMovie.RELEASE_DATE}
        movies={movies}
        onMouseClick={onMovieTitleClick}
        onMovieHover={onMovieMouseHover}
      />
  );

  const moviePoster = main.find(`.movie-card__poster`);

  moviePoster.props().onClick();

  expect(onMovieTitleClick.mock.calls.length).toBe(1);
});
