import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {ButtonShowMore} from './button-show-more';
import {movies} from '../../mocks/test-mocks';
import testFunc from '../../utils';

it(`ButtonShowMore should render correctly`, () => {
  const tree = renderer
    .create(
        <ButtonShowMore
          moviesByGenre={movies}
          moviesCount={1}
          onShowMoreButtonClick={testFunc}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
