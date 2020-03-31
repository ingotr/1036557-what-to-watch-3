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
    starring: item.starring,
    favorite: item.is_favorite,
  };
};

const commentsAdapter = (item) => {
  return {
    id: item.id,
    rating: item.rating,
    date: item.date,
    author: {
      id: item.user.id,
      name: item.user.name,
    },
    text: item.comment,
  };
};

export {commentsAdapter};

export default Adapter;
