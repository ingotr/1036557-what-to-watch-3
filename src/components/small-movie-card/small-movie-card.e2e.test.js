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
};

it(`Should movie card active on mouse hover`, () => {
  const onMovieOver = jest.fn();
  const main = shallow(
      <SmallMovieCard
        key={Movie.id}
        title={Movie.title}
        imgSrc={Movie.imgSrc}

        onMovieHover={onMovieOver}
      />
  );

  const movieCard = main.find(`.small-movie-card`);

  movieCard.props().onMouseOver();
});
