const FirstMovie = {
  TITLE: `Mock-test-The Grand Budapest Hotel`,
  GENRE: `Mock-test-Drama`,
  RELEASE_DATE: 2020,
};

const movies = [
  {
    id: `mock-test-011`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    imgSrc: `img/dardjeeling-limited.jpg`,
    previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Mock-test-Drama`,
  },
  {
    id: `mock-test-012`,
    title: `Bohemian Rhapsody`,
    imgSrc: `img/dardjeeling-limited.jpg`,
    previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Mock-test-Drama`,
  },
  {
    id: `mock-test-013`,
    title: `Macbeth`,
    imgSrc: `img/dardjeeling-limited.jpg`,
    previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Mock-test-Drama`,
  },
  {
    id: `mock-test-014`,
    title: `Aviator`,
    imgSrc: `img/dardjeeling-limited.jpg`,
    previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Mock-test-Drama`,
  },
  {
    id: `mock-test-015`,
    title: `We need to talk about Kevin`,
    imgSrc: `img/dardjeeling-limited.jpg`,
    previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Mock-test-Drama`,
  },
  {
    id: `mock-test-016`,
    title: `What We Do in the Shadows`,
    imgSrc: `img/dardjeeling-limited.jpg`,
    previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Mock-test-Drama`,
  },
  {
    id: `mock-test-017`,
    title: `Revenant`,
    imgSrc: `img/dardjeeling-limited.jpg`,
    previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Mock-test-Thriller`,
  },
  {
    id: `mock-test-018`,
    title: `Johnny English`,
    imgSrc: `img/dardjeeling-limited.jpg`,
    previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Mock-test-Comedy`,
  },
  {
    id: `mock-test-019`,
    title: `We need to talk about Kevin`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
    genre: `Drama`,
  },
  {
    id: `mock-test-020`,
    title: `What We Do in the Shadows`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
    genre: `Drama`,
  },
  {
    id: `mock-test-021`,
    title: `Revenant`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
    genre: `Drama`,
  },
  {
    id: `mock-test-022`,
    title: `Shutter Island`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
    genre: `Drama`,
  },
  {
    id: `mock-test-023`,
    title: `Snatch`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
    genre: `Drama`,
  },
  {
    id: `mock-test-024`,
    title: `Dardjeeling Limited`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
    genre: `Drama`,
  },
  {
    id: `mock-test-025`,
    title: `Mindhunter`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
    genre: `Thriller`,
  },
  {
    id: `mock-test-026`,
    title: `Midnight Special`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
    genre: `Comedy`,
  },
];

const film = {
  id: `grand-budapest`,
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  image: `img/the-grand-budapest-hotel.jpg`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/the-grand-budapest-hotel-bg.jpg`,
  previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
  runtime: `99`,
  rating: 8.9,
  votes: 240,
  favorite: false,
  director: `Wes Andreson`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave &#96s friend and protege.
  Gustave prides himself on providing first-className service to the hotel &#96s
  guests, including satisfying the sexual needs of the many elderly women who stay there.
  When one of Gustave &#96s lovers dies mysteriously, Gustave finds himself the recipient
   of a priceless painting and the chief suspect in her murder.`,
  starring: [
    `Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`,
    `Saoirse Ronan`, `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`,
    `Owen Wilkinson`, `Adrien Brody`, `Ralph Fiennes`, `Jeff Goldblum`],
  reviews: [
    {
      text: `Discerning travellers and Wes Anderson fans will luxuriate
       in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      author: {
        id: 1,
        name: `Kate Muir`,
      },
      date: `March 15, 2019`,
      rating: 8.9,
    },
    {
      text: `Anderson's films are too precious for some, but for those
      of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
      author: {
        id: 2,
        name: `Bill Goodykoontz`,
      },
      date: `March 25, 2019`,
      rating: 8.0,
    },
    {
      text: `I didn't find it amusing, and while I can appreciate the
      creativity, it's an hour and 40 minutes I wish I could take back.`,
      author: {
        id: 3,
        name: `Amanda Greever`,
      },
      date: `March 05, 2019`,
      rating: 8.0,
    },
    {
      text: `The mannered, madcap proceedings are often delightful,
      occasionally silly, and here and there, gruesome and/or heartbreaking.`,
      author: {
        id: 3,
        name: `Matthew Lickona`,
      },
      date: `March 15, 2018`,
      rating: 7.2,
    },
    {
      text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
      author: {
        id: 3,
        name: `Paula Fleri-Soler`,
      },
      date: `March 15, 2019`,
      rating: 7.6,
    },
    {
      text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
      author: {
        id: 5,
        name: `Paula Fleri-Soler`,
      },
      date: `March 4, 2019`,
      rating: 7.0,
    },
  ],
};

export {FirstMovie, movies, film};
