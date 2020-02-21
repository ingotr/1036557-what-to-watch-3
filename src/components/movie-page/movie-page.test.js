import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page.jsx';

import {movieInfo} from '../../mocks/test-mocks.js';

it(`Render App`, () => {
  const tree = renderer
   .create(<MoviePage
     movieInfo={movieInfo}
     title={movieInfo.title}
     genre={movieInfo.genre}
     poster={movieInfo.poster}
     rating={movieInfo.rating}
     director={movieInfo.director}
     description={movieInfo.description}
     starrring={movieInfo.starring}
   />)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
