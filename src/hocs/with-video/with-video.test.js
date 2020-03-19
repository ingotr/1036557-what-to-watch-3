import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withVideo from '../with-video/with-video.jsx';

const Movie = {
  id: `mock-snap-001`,
  title: `mock-test-Bohemian Rhapsody`,
  imgSrc: `img/bohemian-rhapsody.jpg`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withVideo(MockComponent);

it(`Should change withVideo`, () => {
  const onPlayerOver = jest.fn();
  const onPlayerOut = jest.fn();
  const player = shallow(
      <MockComponentWrapped
        isPlaying={false}
        poster={Movie.imgSrc}
        src={Movie.src}
        onMouseOver={onPlayerOver}
        onMouseOut={onPlayerOut}
      />);

  player.simulate(`mouseOver`, onPlayerOver({target: false}));
  player.simulate(`mouseOut`, onPlayerOut({target: false}));

  expect(onPlayerOver.mock.calls.length).toBe(2);
  expect(onPlayerOut.mock.calls.length).toBe(2);
});
