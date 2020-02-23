const films = [
  {
    id: `mock-011`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
  },
  {
    id: `mock-012`,
    title: `Bohemian Rhapsody`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
  },
  {
    id: `mock-013`,
    title: `Macbeth`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
  },
  {
    id: `mock-014`,
    title: `Aviator`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
  },
  {
    id: `mock-015`,
    title: `We need to talk about Kevin`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
  },
  {
    id: `mock-016`,
    title: `What We Do in the Shadows`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
  },
  {
    id: `mock-017`,
    title: `Revenant`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
  },
  {
    id: `mock-018`,
    title: `Johnny English`,
    imgSrc: `img/aviator.jpg`,
    previewSrc: `https://download.blender.org/peach/trailer/trailer_400p.ogg`,
  },
];

const movieInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  runtime: {
    hours: 1,
    minutes: 39,
  },
  poster: {
    big: `img/the-grand-budapest-hotel-poster.jpg`,
    bigAlt: `The Grand Budapest Hotel poster`,
  },
  rating: {
    score: 8.9,
    level: `Very good`,
    count: 240,
  },
  director: `Wes Andreson`,
  description: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave &#96s friend and protege.`,
    `Gustave prides himself on providing first-className service to the hotel &#96s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave &#96s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`],
  starring: [
    `Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`,
    `Saoirse Ronan`, `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`,
    `Owen Wilkinson`, `Adrien Brody`, `Ralph Fiennes`, `Jeff Goldblum`],
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

export {films, movieInfo};
