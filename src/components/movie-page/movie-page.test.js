import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page.jsx';

import {movies, movieInfo} from '../../mocks/test-mocks.js';

it(`Render App`, () => {
  const tree = renderer
   .create(<MoviePage
     movieInfo={movieInfo}
     movies={movies}

     onMovieHover={() => {}}
   />)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
