import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';
import withVideo from '../../hocs/with-video/with-video.jsx';
import {Link} from 'react-router-dom';

const VideoPlayerWrapped = withVideo(VideoPlayer);

const SmallMovieCard = (props) => {

  const {film, onMovieCardClick} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onClick={() => {
        onMovieCardClick(film);
      }}>
      <VideoPlayerWrapped
        isPlaying={false}
        poster={film.image}
        src={film.previewSrc}
      />
      <h3 className="small-movie-card__title">
        <Link to={`/films/` + film.id} className="small-movie-card__link">{film.name}</Link>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
    image: PropTypes.string,
    previewSrc: PropTypes.string,
    poster: PropTypes.string,
    cover: PropTypes.string,
  }).isRequired,

  onMovieCardClick: PropTypes.func,
};

export default SmallMovieCard;
