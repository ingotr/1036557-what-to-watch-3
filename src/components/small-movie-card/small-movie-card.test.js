import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card.jsx';
import {BrowserRouter} from 'react-router-dom';

import {film} from '../../mocks/test-mocks.js';

it(`Render App`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <SmallMovieCard
            film={film}
            key={film.id}
            onMovieCardClick={() => {}}
            onMovieHover={() => {}}
            onMovieLeave={() => {}}
          />
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
