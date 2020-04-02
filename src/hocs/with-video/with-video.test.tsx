import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withVideo from '../with-video/with-video';

const Movie = {
  id: `mock-snap-001`,
  title: `mock-test-Bohemian Rhapsody`,
  poster: `img/bohemian-rhapsody.jpg`,
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
        image={Movie.poster}
        src={Movie.src}
      />);

  player.simulate(`mouseOver`, onPlayerOver({target: false}));
  player.simulate(`mouseOut`, onPlayerOut({target: false}));

  expect(onPlayerOver.mock.calls.length).toBe(1);
  expect(onPlayerOut.mock.calls.length).toBe(1);
});
