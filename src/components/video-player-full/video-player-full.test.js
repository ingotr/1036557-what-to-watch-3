import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayerFull from './video-player-full.jsx';
import {film} from '../../mocks/test-mocks.js';

it(`<FullVideoPlayer /> should render correctly`, () => {
  const tree = renderer
    .create(
        <VideoPlayerFull
          film={film}
          onItemLeave={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
