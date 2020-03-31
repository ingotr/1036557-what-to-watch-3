import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallMovieCard from './small-movie-card.jsx';

import {film} from '../../mocks/test-mocks.js';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie card active on mouse hover`, () => {
  const onMovieOver = jest.fn();
  const smallMovieCard = shallow(
      <SmallMovieCard
        film={film}
        key={film.id}
        onMovieCardClick={() => {}}
        onMovieHover={() => {}}
        onMovieLeave={() => {}}
      />
  );

  const movieCard = smallMovieCard.find(`.small-movie-card`);

  movieCard.simulate(`mouseOver`, onMovieOver({target: false}));

  expect(onMovieOver.mock.calls.length).toBe(1);
});
