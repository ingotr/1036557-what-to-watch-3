import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

import {FirstMovie, movies} from '../../mocks/test-mocks.js';

it(`Render App`, () => {
  const tree = renderer
   .create(<Main
     title={FirstMovie.TITLE}
     genre={FirstMovie.GENRE}
     releaseDate={FirstMovie.RELEASE_DATE}
     movies={movies}
     onMouseClick={() => {}}
     onMovieHover={() => {}}
   />)
   .toJSON();

  expect(tree).toMatchSnapshot();
});

