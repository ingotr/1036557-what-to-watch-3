import React from 'react';
import renderer from 'react-test-renderer';
import GenreList from './genre-list.jsx';

import {movies} from '../../mocks/test-mocks.js';

it(`Render App`, () => {
  const tree = renderer
   .create(<GenreList
     movies={movies}
   />)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
