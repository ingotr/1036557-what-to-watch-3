import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallMovieCard from './small-movie-card.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const Movie = {
  id: `mock-card-test-011`,
  title: `mock-test-Fantastic Beasts`,
  imgSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Should movie card active on mouse hover`, () => {
  const onMovieOver = jest.fn();
  const smallMovieCard = shallow(
      <SmallMovieCard
        id={Movie.id}
        title={Movie.title}
        imgSrc={Movie.imgSrc}
        previewSrc={Movie.previewSrc}
        onMovieHover={onMovieOver}
      />
  );

  const movieCard = smallMovieCard.find(`.small-movie-card`);

  movieCard.simulate(`mouseOver`, onMovieOver({target: false}));

  expect(onMovieOver.mock.calls.length).toBe(1);
});
