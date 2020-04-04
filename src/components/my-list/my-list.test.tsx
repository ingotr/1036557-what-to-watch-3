import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MyList} from './my-list';
import {movies} from '../../mocks/test-mocks';
import {BrowserRouter} from 'react-router-dom';

import {testFunc} from '../../utils';

it(`Render MyList`, () => {
  const main = renderer
          .create(
              <BrowserRouter >
                <MyList
                  activeItem={null}
                  avatarUrl=""
                  movies={movies}
                  onMovieCardClick={testFunc}
                  onMovieFavoriteStatusClick={testFunc}
                  onItemEnter={testFunc}
                  onItemLeave={testFunc}
                  getMyListMovies={testFunc}
                />
              </BrowserRouter>, {
                createNodeMock: () => {
                  return {};
                }
              }
          )
    .toJSON();

  expect(main).toMatchSnapshot();
});
