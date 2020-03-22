const Adapter = (item) => {
  return {
    id: `${item.id}`,
    name: item.name,
    genre: item.genre,
    year: item.released,
    image: item.preview_image,
    poster: item.poster_image,
    cover: item.background_image,
    previewSrc: item.preview_video_link,
    runtime: `${item.run_time}`,
    rating: item.rating,
    votes: item.scores_count,
    director: item.director,
    description: item.description,
    reviews: [
      {
        rating: 10,
        date: `March 15, 2019`,
        author: `Jane Doe`,
        text: `Fantastic!`
      },
      {
        rating: 10,
        date: `March 15, 2019`,
        author: `Jane Doe`,
        text: `Fantastic!`
      },
      {
        rating: 10,
        date: `March 15, 2019`,
        author: `Jane Doe`,
        text: `Fantastic!`
      }
    ],
    starring: item.starring,
  };
};

export default Adapter;
