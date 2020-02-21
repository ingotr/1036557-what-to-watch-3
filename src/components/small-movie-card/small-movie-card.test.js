import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card.jsx';

const Movie = {
  id: `mock-card-snap-001`,
  title: `mock-test-Bohemian Rhapsody`,
  imgSrc: `img/bohemian-rhapsody.jpg`,
  previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Render App`, () => {
  const tree = renderer
    .create(
        <SmallMovieCard
          id={Movie.id}
          title={Movie.title}
          imgSrc={Movie.imgSrc}
          previewSrc={Movie.previewSrc}
          onMovieHover={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
