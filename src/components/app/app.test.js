import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {FirstMovie, movies, movieInfo} from '../../mocks/test-mocks.js';

it(`Render App`, () => {
  const tree = renderer
   .create(<App
     title={FirstMovie.TITLE}
     genre={FirstMovie.GENRE}
     releaseDate={FirstMovie.RELEASE_DATE}
     movies={movies}
     movieInfo={movieInfo}
   />)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
