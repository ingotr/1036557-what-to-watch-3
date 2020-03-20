import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayerFull from './video-player-full.jsx';
import {film} from '../../mocks/test-mocks.js';

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should change state isPlaying`, () => {
  const videoPlayer = mount(
      <VideoPlayerFull
        film={film}
        onItemLeave={() => {}}
      />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = videoPlayer.instance();

  jest.spyOn(_videoRef.current, `play`);

  videoPlayer.instance().componentDidMount();

  videoPlayer.find(`button.player__play`).simulate(`click`);

  expect(videoPlayer.state(`isPlaying`)).toBe(true);
});
