import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';
import withVideo from '../../hocs/with-video/with-video.jsx';

const VideoPlayerWrapped = withVideo(VideoPlayer);

const SmallMovieCard = (props) => {

  const {name, image, previewSrc} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <VideoPlayerWrapped
        isPlaying={false}
        poster={image}
        src={previewSrc}
      />
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  previewSrc: PropTypes.string,
};

export default SmallMovieCard;
