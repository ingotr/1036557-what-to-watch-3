import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {mount} from 'enzyme';
import VideoPlayerFull from './video-player-full';
import {film} from '../../mocks/test-mocks';
import testFunc from '../../utils';

Enzyme.configure({
  adapter: new Adapter()
});

it(`Click by Play button calls callback`, () => {
  const handlePlayButtonClick = jest.fn();
  const videoPlayer = mount(
      <VideoPlayerFull
        movie={film}
        onItemLeave={testFunc}
        isPlaying={false}
        timer={`0`}
        progressBar={{left: `14px`}}
        onPlayClick={handlePlayButtonClick}
        onFullScreenClick={testFunc}
        progressValue={`0`}
      />);

  videoPlayer.find(`.player__play`).simulate(`click`);
  expect(handlePlayButtonClick).toHaveBeenCalledTimes(1);
});

it(`Click by Exit button calls callback`, () => {
  const handleExitButtonClick = jest.fn();
  const videoPlayer = mount(
      <VideoPlayerFull
        movie={film}
        onItemLeave={handleExitButtonClick}
        isPlaying={false}
        timer={`0`}
        progressBar={{left: `14px`}}
        onPlayClick={testFunc}
        onFullScreenClick={testFunc}
        progressValue={`0`}
      />);

  videoPlayer.find(`.player__exit`).simulate(`click`);
  expect(handleExitButtonClick).toHaveBeenCalledTimes(1);
});

it(`Click by FullScreen button calls callback`, () => {
  const handleFullScreenButtonClick = jest.fn();
  const videoPlayer = mount(
      <VideoPlayerFull
        movie={film}
        onItemLeave={testFunc}
        isPlaying={false}
        timer={`0`}
        progressBar={{left: `14px`}}
        onPlayClick={testFunc}
        onFullScreenClick={handleFullScreenButtonClick}
        progressValue={`0`}
      />);

  videoPlayer.find(`.player__full-screen`).simulate(`click`);
  expect(handleFullScreenButtonClick).toHaveBeenCalledTimes(1);
});
