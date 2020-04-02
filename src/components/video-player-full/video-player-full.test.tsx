import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VideoPlayerFull from './video-player-full';
import {film} from '../../mocks/test-mocks.js';
import testFunc from '../../utils';

it(`<FullVideoPlayer /> should render correctly`, () => {
  const tree = renderer
    .create(
        <VideoPlayerFull
          movie={film}
          onItemLeave={testFunc}
          isPlaying={false}
          timer={`0`}
          progressBar={{left: `14px`}}
          onPlayClick={testFunc}
          onFullScreenClick={testFunc}
          progressValue={`0`}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
