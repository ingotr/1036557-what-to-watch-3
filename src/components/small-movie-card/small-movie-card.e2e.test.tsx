import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SmallMovieCard from './small-movie-card';
import testFunc from '../../utils';

import {film} from '../../mocks/test-mocks';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie card active on mouse hover`, () => {
  const onMovieOver = jest.fn();
  const smallMovieCard = Enzyme.shallow(
      <SmallMovieCard
        movie={film}
        key={film.id}
        onMovieCardClick={testFunc}
        onMovieHover={testFunc}
        onMovieLeave={testFunc}
      />
  );

  const movieCard = smallMovieCard.find(`.small-movie-card`);

  movieCard.simulate(`mouseOver`, onMovieOver({target: false}));

  expect(onMovieOver.mock.calls.length).toBe(1);
});
