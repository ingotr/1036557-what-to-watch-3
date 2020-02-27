import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreList from './genre-list.jsx';

import {movies} from '../../mocks/test-mocks.js';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should genreList item be pressed`, () => {
  const onGenreListCLick = jest.fn();

  const GenreListElement = shallow(
      <GenreList
        movies={movies}
      />
  );

  GenreListElement.find(`.catalog__genres-item`).forEach((node) => {
    node.simulate(`onClick`, onGenreListCLick({target: false}));
  });

  expect(onGenreListCLick.mock.calls.length).toBe(4);
});
