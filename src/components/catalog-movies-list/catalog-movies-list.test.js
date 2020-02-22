import React from 'react';
import renderer from 'react-test-renderer';
import CatalogMoviesList from './catalog-movies-list.jsx';

import {movies} from '../../mocks/test-mocks.js';

it(`Render App`, () => {
  const tree = renderer
   .create(<CatalogMoviesList
     movies={movies}
     onMovieHover={() => {}}
   />)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
