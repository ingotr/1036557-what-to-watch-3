import * as React from 'react';
import {MovieInterface} from '../../types';
import history from '../../history';

interface Props {
  movie: MovieInterface;
  onItemLeave: () => void;
  isPlaying: boolean;
  timer: string;
  progressBar: React.CSSProperties;
  onPlayClick: () => void;
  onFullScreenClick: () => void;
  progressValue: string;
}

const VideoPlayerFull: React.FunctionComponent<Props> = (Props) =>{

  const {progressBar, timer, isPlaying, movie,
    onItemLeave, onPlayClick, onFullScreenClick,
    progressValue, children} = Props;

  return (
    <div className="player" style={{zIndex: 10}}>

      {children}

      <button
        onClick={() => {
          onItemLeave();
          history.goBack();
        }}
        type="button"
        className="player__exit"
      >Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progressValue} max="100"></progress>
            <div className="player__toggler" style={progressBar}>Toggler</div>
          </div>
          <div className="player__time-value">{timer}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={onPlayClick}
          >
            {!isPlaying ? (
            <><svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span></>
            ) : (
            <><svg viewBox="0 0 14 21" width="14" height="21">
              <use xlinkHref="#pause"></use>
            </svg><span>Pause</span></>)}
          </button>
          <div className="player__name">{movie.name}</div>

          <button
            onClick={onFullScreenClick}
            type="button"
            className="player__full-screen"
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerFull;
