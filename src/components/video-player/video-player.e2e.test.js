import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './video-player.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const Movie = {
  id: `mock-card-test-011`,
  title: `mock-test-Fantastic Beasts`,
  imgSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Should VideoPlayer start/stop playing on mouse hover`, () => {
  const onPlayerOver = jest.fn();
  const onPlayerOut = jest.fn();
  const player = shallow(
      <VideoPlayer
        key={Movie.id}
        isPlaying={false}
        poster={Movie.imgSrc}
        src={Movie.src}
        onMouseOver={onPlayerOver}
        onMouseOut={onPlayerOut}
      />
  );

  player.simulate(`mouseOver`, onPlayerOver({target: false}));
  player.simulate(`mouseOut`, onPlayerOut({target: false}));

  expect(onPlayerOver.mock.calls.length).toBe(1);
  expect(onPlayerOut.mock.calls.length).toBe(1);
});
