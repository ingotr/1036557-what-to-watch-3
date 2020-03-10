import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tabs from './tabs.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const Movie = {
  title: `Mock-test-The Grand Budapest Hotel`,
  genre: `Mock-test-Drama`,
  year: 2017,
  runtime: {
    hours: 1,
    minutes: 39,
  },
  poster: {
    big: `img/the-grand-budapest-hotel-poster.jpg`,
    bigAlt: `Mock-test-The Grand Budapest Hotel poster`,
  },
  rating: {
    score: 8.9,
    level: `Mocks-Very good`,
    count: 240,
  },
  director: `Mock-Wes Andreson`,
  description: [`Mock-test-In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave &#96s friend and protege.`,
    `Gustave prides himself on providing first-className service to the hotel &#96s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave &#96s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`],
  starring: [`Mock-test-Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  reviews: [
    {
      text: `Discerning travellers and Wes Anderson fans will luxuriate
       in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      author: `Kate Muir`,
      dateTime: {
        string: `2016-12-24`,
        reviewYear: 2016,
        month: `December`,
        day: 24,
      },
      rating: 8.9,
    },
    {
      text: `Anderson's films are too precious for some, but for those
      of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
      author: `Bill Goodykoontz`,
      dateTime: {
        string: `2015-11-18`,
        reviewYear: 2015,
        month: `November`,
        day: 18,
      },
      rating: 8.0,
    },
    {
      text: `I didn't find it amusing, and while I can appreciate the
      creativity, it's an hour and 40 minutes I wish I could take back.`,
      author: `Amanda Greever`,
      dateTime: {
        string: `2015-11-18`,
        reviewYear: 2015,
        month: `November`,
        day: 18,
      },
      rating: 8.0,
    },
    {
      text: `The mannered, madcap proceedings are often delightful,
      occasionally silly, and here and there, gruesome and/or heartbreaking.`,
      author: `Matthew Lickona`,
      dateTime: {
        string: `2016-12-20`,
        reviewYear: 2016,
        month: `December`,
        day: 20,
      },
      rating: 7.2,
    },
    {
      text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
      author: `Paula Fleri-Soler`,
      dateTime: {
        string: `2016-12-20`,
        reviewYear: 2016,
        month: `December`,
        day: 20,
      },
      rating: 7.6,
    },
    {
      text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
      author: `Paula Fleri-Soler`,
      dateTime: {
        string: `2016-12-20`,
        reviewYear: 2016,
        month: `December`,
        day: 24,
      },
      rating: 7.0,
    },
  ],
};

it(`Should NavItems be pressed`, () => {
  const onNavItemClick = jest.fn();

  const TabsElement = shallow(
      <Tabs
        genre={Movie.genre}
        year={Movie.year}
        runtime={Movie.runtime}
        score={Movie.rating.score}
        level={Movie.rating.level}
        count={Movie.rating.count}
        director={Movie.director}
        description={Movie.description}
        starring={Movie.starring}
        reviews={Movie.reviews}
      />
  );

  TabsElement.find(`.movie-nav__item`).forEach((node) => {
    node.simulate(`onClick`, onNavItemClick({target: false}));
  });

  expect(onNavItemClick.mock.calls).toHaveLength(3);
});
