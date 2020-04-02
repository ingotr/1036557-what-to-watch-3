import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card';
import {BrowserRouter} from 'react-router-dom';
import testFunc from '../../utils';

import {film} from '../../mocks/test-mocks';

it(`Render App`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <SmallMovieCard
            movie={film}
            key={film.id}
            onMovieCardClick={testFunc}
            onMovieHover={testFunc}
            onMovieLeave={testFunc}
          />
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
