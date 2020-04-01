import * as React from 'react';
import {MovieInterface} from '../../types';

interface Props {
  movie: MovieInterface;
  onItemLeave: () => void;
}

interface State {
  isPlaying: boolean;
  progress: number;
  progressValue: number;
}

class VideoPlayerFull extends React.PureComponent<Props, State> {
  private _videoRef: React.RefObject<HTMLVideoElement>;
  constructor(props) {
    super(props);
    this._videoRef = React.createRef();

    this.state = {
      isPlaying: false,
      progress: 0,
      progressValue: 0
    };
  }

  componentDidMount() {
    if (!this._videoRef.current) {
      return;
    }

    const video = this._videoRef.current;

    video.src = this.props.movie.previewSrc;

    video.onended = () => this.setState({
      isPlaying: false,
    });

    video.ontimeupdate = () => this.setState({
      progress: Math.floor(video.duration - video.currentTime),
      progressValue: Math.floor((100 / video.duration) *
        video.currentTime),
    });
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.src = ``;
    video.ontimeupdate = null;
    video.onended = null;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  render() {
    const timer = `0:00:${(this.state.progress < 10) ? `0` + this.state.progress : this.state.progress}`;
    const progressBar = {
      left: this.state.progressValue + `%`,
    };

    return (
      <div className="player" style={{zIndex: 10}}>
        <video
          ref={this._videoRef}
          className="player__video"
          poster={this.props.movie.poster}
          autoPlay
        ></video>

        <button
          onClick={() => {
            this.props.onItemLeave();
            history.back();
          }}
          type="button"
          className="player__exit"
        >Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={this.state.progressValue} max="100"></progress>
              <div className="player__toggler" style={progressBar}>Toggler</div>
            </div>
            <div className="player__time-value">{timer}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={() => {
                this.setState({isPlaying: !this.state.isPlaying});
              }}
            >
              {this.state.isPlaying ? (
                <><svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg><span>Pause</span></>
              ) : (
                <><svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                  <span>Play</span></>
              )}
            </button>
            <div className="player__name">{this.props.movie.name}</div>

            <button
              onClick={() => {
                const video = this._videoRef.current;
                video.requestFullscreen();
              }}
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
  }
}

export default VideoPlayerFull;
