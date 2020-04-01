import React from 'react';
import renderer from 'react-test-renderer';
import {MyList} from './my-list';
import {movies} from '../../mocks/test-mocks';
import {BrowserRouter} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user.js';

it(`Render MyList`, () => {
  const main = renderer
    .create(
        <BrowserRouter >
          <MyList
            activeItem={null}
            authorizationStatus={AuthorizationStatus}
            avatarUrl=""
            movies={movies}
            onMovieCardClick={()=>{}}
            onFilmFavoriteStatusClick={()=>{}}
            onItemEnterHandler={()=>{}}
            onItemLeaveHandler={()=>{}}
            loading={()=>{}}
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
