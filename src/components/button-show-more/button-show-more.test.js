import React from 'react';
import renderer from 'react-test-renderer';
import {ButtonShowMore} from './button-show-more.jsx';
import {movies} from '../../mocks/test-mocks.js';

it(`ButtonShowMore should render correctly`, () => {
  const tree = renderer
    .create(
        <ButtonShowMore
          moviesByGenre={movies}
          moviesCount={1}
          onShowMoreButtonClick={() => {}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
