import * as React from 'react'
import VideoPlayer from '../video-player/video-player';
import withVideo from '../../hocs/with-video/with-video';
import {Link} from 'react-router-dom';
import {MovieInterface} from '../../types';

interface Props {
  movie: MovieInterface;
  onMovieCardClick: (movie: MovieInterface) => void;
  onMovieHover: () => void;
  onMovieLeave: () => void;
}

const VideoPlayerWrapped = withVideo(VideoPlayer);

const SmallMovieCard: React.FunctionComponent<Props> = (props: Props) => {

  const {movie, onMovieCardClick} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onClick={() => {
        onMovieCardClick(movie);
      }}>
      <VideoPlayerWrapped
        isPlaying={false}
        image={movie.image}
        src={movie.previewSrc}
      />
      <h3 className="small-movie-card__title">
        <Link to={`/films/` + movie.id} className="small-movie-card__link">{movie.name}</Link>
      </h3>
    </article>
  );
};

export default SmallMovieCard;
